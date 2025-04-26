import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateActivityDto } from './dto/createActivity.dto';
import { Activity } from './interface/activity.interface';

@ApiTags('activities')
@Controller('trips/:trip_id/activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Post('/create')
  @ApiOperation({ summary: 'Creates a new activity on trip' })
  @ApiBody({
    description: 'Body details',
    type: CreateActivityDto,
  })
  @ApiCreatedResponse({
    status: 201,
    description: 'Activity created',
    example: {
      activityId: '123e4567-e89b-12d3-a456-426614174000',
    },
  })
  async createActivity(
    @Param('trip_id') tripId: string,
    @Body() activity: CreateActivityDto,
  ) {
    return this.activitiesService.createActivity(tripId, activity);
  }

  @Get()
  @ApiOperation({ summary: 'Return trip activities' })
  @ApiResponse({
    status: 200,
    description: 'Activities listed',
    type: [Activity],
  })
  async listActivities(@Param('trip_id') tripId: string) {
    return this.activitiesService.listActivities(tripId);
  }

  @Delete('/:activity_id')
  @ApiOperation({ summary: 'Delete activity from the trip' })
  @ApiResponse({
    status: 200,
    description: 'Activity deleted',
  })
  async deleteActivity(
    @Param('trip_id') tripId: string,
    @Param('activity_id') activityId: string,
  ) {
    return this.activitiesService.deleteActivity(tripId, activityId);
  }
}
