import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateActivityDto } from './dto/createActivity.dto';
import { TripsService } from 'src/trips/trips.service';
import dayjs from 'src/lib/dayjs';

@Injectable()
export class ActivitiesService {
  constructor(
    readonly prismaService: PrismaService,
    readonly tripService: TripsService,
  ) {}

  async createActivity(tripId: string, activity: CreateActivityDto) {
    try {
      const { trip } = await this.tripService.findTripById(tripId);
      if (!trip) throw new NotFoundException('Trip not found');

      const createdActivity = await this.prismaService.activity.create({
        data: {
          title: activity.title,
          occurs_at: activity.occursAt,
          trip_id: tripId,
        },
      });

      console.log(activity);

      return { activityId: createdActivity.id };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Failed to create activity',
        error,
      );
    }
  }

  async deleteActivity(tripId: string, activityId: string) {
    try {
      const { trip } = await this.tripService.findTripById(tripId);
      const activity = await this.prismaService.activity.findUnique({
        where: {
          id: activityId,
        },
      });

      if (!trip) throw new NotFoundException('Trip not found');
      if (!activity) throw new NotFoundException('Activity not found');

      const deletedActivity = await this.prismaService.activity.delete({
        where: {
          id: activityId,
        },
      });

      return { activityId: deletedActivity.id };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Failed to delete activity',
        error,
      );
    }
  }

  async listActivities(tripId: string) {
    try {
      const { trip } = await this.tripService.findTripById(tripId);

      if (!trip) throw new NotFoundException('Trip not found');

      const differenceInDaysBetweenStartAndEnd = dayjs(trip.ends_at).diff(
        trip.starts_at,
        'days',
      );

      const activities = Array.from({
        length: differenceInDaysBetweenStartAndEnd + 1,
      }).map((_, index) => {
        const date = dayjs(trip.starts_at).add(index, 'days');
        return {
          date: date.toDate(),
          activities: trip.activities.filter((activity) => {
            return dayjs(activity.occurs_at).isSame(date, 'day');
          }),
        };
      });

      return { activities: activities };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Failed to list activities',
        error,
      );
    }
  }
}
