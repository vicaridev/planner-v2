import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { TripsService } from 'src/trips/trips.service';
import { CreateTripConfirmationEmail } from 'src/nodemailer/dto/createTripConfirmation';
import { NodemailerService } from 'src/nodemailer/nodemailer.service';

@Injectable()
export class ParticipantsService {
  readonly logger: Logger = new Logger(ParticipantsService.name);
  private readonly clientBaseUrl;
  constructor(
    readonly prismaService: PrismaService,
    readonly configService: ConfigService,
    readonly tripService: TripsService,
    readonly nodemailerService: NodemailerService,
  ) {
    this.clientBaseUrl = this.configService.get<string>('WEB_BASE_URL');
  }

  async confirmTripParticipation(tripId: string, participantId: string) {
    try {
      const { trip } = await this.tripService.findTripById(tripId);

      if (!trip) throw new NotFoundException('Trip not found');

      const participant = await this.prismaService.userTrip.findUnique({
        where: {
          id: participantId,
        },
      });

      if (!participant) throw new NotFoundException('Participant not found');

      if (participant.isConfirmed)
        throw new BadRequestException('Participant already confirmed');

      const updatedParticipant = await this.prismaService.userTrip.update({
        where: {
          id: participant.id,
        },
        data: {
          isConfirmed: true,
        },
      });
      return { participantId: updatedParticipant.id };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Failed to confirm participant',
        error,
      );
    }
  }

  async inviteParticipant(tripId: string, emailsToInvite: string[]) {
    try {
      const { trip } = await this.tripService.findTripById(tripId);

      if (trip instanceof Error) throw new NotFoundException('Trip not found');

      await this.prismaService.userTrip.createMany({
        data: emailsToInvite.map((email) => {
          return { tripId: tripId, email };
        }),
      });

      const participantsToInvite = await this.prismaService.userTrip.findMany({
        where: {
          email: { in: emailsToInvite },
          tripId: tripId,
        },
      });
      let emailsCount = 0;

      this.logger.verbose('Will start to send e-mails now...');

      await Promise.all(
        participantsToInvite.map(async (participant, index) => {
          const link = `${this.clientBaseUrl}/trips/${trip.id}/participants/${participant.id}/invite`;
          const emailInfo: CreateTripConfirmationEmail = {
            name: '',
            email: participant.email,
            destination: trip.destination,
            startsAt: trip.starts_at,
            endsAt: trip.ends_at,
            confirmationLink: link,
          };
          await this.nodemailerService.inviteParticipant(emailInfo);
          emailsCount = index + 1;
        }),
      );
      this.logger.verbose(`All ${emailsCount} emails sent.`);

      return { invitedParticipants: participantsToInvite };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Failed to invite participant(s)',
        error,
      );
    }
  }

  async removeParticipant(tripId: string, participantId: string) {
    try {
      const { trip } = await this.tripService.findTripById(tripId);

      if (!trip) throw new NotFoundException('Trip not found');

      const participant = await this.prismaService.userTrip.findUnique({
        where: {
          id: participantId,
        },
      });

      if (!participant) throw new NotFoundException('Participant not found');

      const deletedParticipant = await this.prismaService.userTrip.delete({
        where: {
          id: participantId,
        },
      });

      return { participantId: deletedParticipant };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Failed to remove participant',
        error,
      );
    }
  }

  async findParticipantById(participantId: string) {
    try {
      const participant = await this.prismaService.userTrip.findUnique({
        where: {
          id: participantId,
        },
      });

      if (!participant) throw new NotFoundException('Participant not found');

      return participant;
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Failed to find participant',
        error,
      );
    }
  }

  async listParticipants(tripId: string) {
    try {
      const { trip } = await this.tripService.findTripById(tripId);

      if (!trip) throw new NotFoundException('Trip not found');

      const participants = await this.prismaService.userTrip.findMany({
        where: {
          tripId: tripId,
        },
      });

      return { participants: participants };
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

  async listTripsByUserId(userId: string) {
    try {
      const trips = await this.prismaService.userTrip.findMany({
        where: {
          userId,
        },
        include: {
          trip: true,
        },
      });

      return { trips };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to list trips', error);
    }
  }
}
