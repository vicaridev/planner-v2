import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TripsService } from 'src/trips/trips.service';
import { CreateLinkDto } from './dto/createLink.dto';

@Injectable()
export class LinksService {
  constructor(
    readonly prismaService: PrismaService,
    readonly tripsService: TripsService,
  ) {}

  async createLink(tripId: string, link: CreateLinkDto) {
    try {
      const { trip } = await this.tripsService.findTripById(tripId);

      if (!trip) throw new NotFoundException('Trip not found');

      const newLink = await this.prismaService.link.create({
        data: {
          trip_id: tripId,
          title: link.title,
          url: link.url,
        },
      });

      return { link: newLink };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to create link', error);
    }
  }

  async deleteLink(tripId: string, linkId: string) {
    try {
      const { trip } = await this.tripsService.findTripById(tripId);

      if (!trip) throw new NotFoundException('Trip not found');

      const deletedLink = await this.prismaService.link.delete({
        where: {
          id: linkId,
        },
      });
      return { linkId: deletedLink.id };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to delete link', error);
    }
  }

  async listLinks(tripId: string) {
    try {
      const { trip } = await this.tripsService.findTripById(tripId);

      if (!trip) throw new NotFoundException('Trip not found');

      const links = await this.prismaService.link.findMany({
        where: {
          trip_id: tripId,
        },
      });

      return { links: links };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to list links', error);
    }
  }
}
