import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateTripDto } from './dto/createTrip.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import dayjs from 'src/lib/dayjs';
import { CreateTripConfirmationEmail } from 'src/nodemailer/dto/createTripConfirmation';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { NodemailerService } from 'src/nodemailer/nodemailer.service';
import { UpdateTripDto } from './dto/updateTrip.dto';

@Injectable()
export class TripsService {
  readonly logger: Logger = new Logger(TripsService.name);
  constructor(
    readonly userService: UsersService,
    readonly prismaService: PrismaService,
    readonly nodemailerService: NodemailerService,
    readonly configService: ConfigService,
  ) {}

  async createTrip({
    destination,
    startsAt,
    endsAt,
    emailsToInvite,
    ownerId,
  }: CreateTripDto) {
    try {
      const user = await this.userService.findUserById(ownerId);

      if (user instanceof Error) throw new NotFoundException('User not found');

      const startDateIsNotValid = dayjs(startsAt).isBefore(new Date());
      const endDateIsNotValid = dayjs(endsAt).isBefore(startsAt);

      if (startDateIsNotValid) {
        throw new BadRequestException('Invalid trip start date');
      }

      if (endDateIsNotValid) {
        throw new BadRequestException('Invalid trip end date');
      }

      const usersToInvite = emailsToInvite.map((email) => {
        return { email };
      });

      const trip = await this.prismaService.trip.create({
        data: {
          destination: destination,
          starts_at: startsAt,
          ends_at: endsAt,
          owner: {
            connect: {
              id: ownerId,
            },
          },
          participants: {
            createMany: {
              data: [
                {
                  userId: ownerId,
                  email: user!.email,
                  isOwner: true,
                },
                ...usersToInvite,
              ],
            },
          },
        },
      });

      const baseUrl = this.configService.get<string>('API_BASE_URL');
      const link = `${baseUrl}/trips/${trip.id}/confirm`;

      const emailInfo: CreateTripConfirmationEmail = {
        name: user!.name,
        confirmationLink: link,
        email: user!.email,
        startsAt: trip.starts_at,
        endsAt: trip.ends_at,
        destination: trip.destination,
      };

      await this.nodemailerService.confirmTripCreation(emailInfo);

      return { trip: trip };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to create trip', error);
    }
  }

  async findTripById(tripId: string) {
    try {
      const trip = await this.prismaService.trip.findUnique({
        where: {
          id: tripId,
        },
        include: {
          activities: true,
          links: true,
          participants: true,
        },
      });
      if (!trip) throw new NotFoundException('Trip not found');

      return { trip: trip };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to find trip', error);
    }
  }

  async listParticipantsByTripId(tripId: string) {
    try {
      const trip = await this.prismaService.trip.findUnique({
        where: {
          id: tripId,
        },
        include: {
          participants: true,
        },
      });

      if (!trip) throw new NotFoundException('Trip not found');

      return { participants: trip.participants };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Failed to list participants',
        error,
      );
    }
  }

  async confirmTrip(tripId: string) {
    try {
      const trip = await this.prismaService.trip.findUnique({
        where: {
          id: tripId,
        },
        include: {
          participants: true,
        },
      });
      if (!trip) throw new NotFoundException('Trip not found');

      await this.prismaService.trip.update({
        where: {
          id: trip.id,
        },
        data: {
          is_confirmed: true,
        },
      });

      const baseUrl = this.configService.get<string>('WEB_BASE_URL');

      const participantsToInvite = trip.participants.filter(
        (participant) => participant.tripId === trip.id && !participant.isOwner,
      );
      await Promise.all(
        participantsToInvite.map(async (participant) => {
          const link = `${baseUrl}/trips/${trip.id}/participants/${participant.id}/invite`;
          const emailInfo: CreateTripConfirmationEmail = {
            name: '',
            email: participant.email,
            destination: trip.destination,
            confirmationLink: link,
            startsAt: trip.starts_at,
            endsAt: trip.ends_at,
          };
          await this.nodemailerService.inviteParticipant(emailInfo);
        }),
      );
      return {
        message: 'Trip confirmed and all e-mails were sent to participants',
        tripIp: trip.id,
      };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to confirm trip', error);
    }
  }

  async updateTrip(tripId: string, tripToUpdate: UpdateTripDto) {
    try {
      const trip = await this.prismaService.trip.findUnique({
        where: {
          id: tripId,
        },
      });

      const startDateIsNotValid = dayjs(tripToUpdate.startsAt).isBefore(
        new Date(),
      );
      const endDateIsNotValid = dayjs(tripToUpdate.endsAt).isBefore(
        tripToUpdate.startsAt,
      );

      if (startDateIsNotValid) {
        throw new Error('Invalid trip start date');
      }

      if (endDateIsNotValid) {
        throw new Error('Invalid trip end date');
      }

      if (!trip) throw new Error('Trip not found');

      const updatedTrip = await this.prismaService.trip.update({
        where: {
          id: tripId,
        },
        data: {
          destination: tripToUpdate.destination,
          starts_at: tripToUpdate.startsAt,
          ends_at: tripToUpdate.endsAt,
        },
      });

      return { tripId: updatedTrip.id };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to update trip', error);
    }
  }
}
