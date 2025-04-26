import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { TripsService } from './trips.service';
import { CreateTripDto } from './dto/createTrip.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { createTripBodyExample } from './dto/examples/createTrip';
import { Trip } from './interface/trip.interface';
import { UpdateTripDto } from './dto/updateTrip.dto';

@ApiTags('trips')
@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Post()
  @ApiOperation({ summary: 'Creates a new trip' })
  @ApiBody({
    description: 'Details of the trip to be created',
    type: CreateTripDto,
    examples: {
      example1: {
        summary: 'Basic example',
        description: 'An example of creating a trip',
        value: createTripBodyExample,
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Trip created',
  })
  async createTrip(@Body() trip: CreateTripDto) {
    return await this.tripsService.createTrip(trip);
  }

  @Get('/:trip_id/confirm')
  @ApiOperation({
    summary: 'Confirm trip creation and send e-mail to participants',
  })
  async confirmTrip(@Param('trip_id') tripId: string) {
    return await this.tripsService.confirmTrip(tripId);
  }

  @Get('/:tripId')
  @ApiOperation({ summary: 'Retrieve trip based on trip id' })
  @ApiResponse({
    status: 200,
    description: 'Trip details retrieved with sucess',
    type: Trip,
  })
  async findTripById(@Param('tripId') tripId: string) {
    return await this.tripsService.findTripById(tripId);
  }

  @Put('/:trip_id')
  @ApiOperation({ summary: 'Update trip details' })
  @ApiResponse({
    status: 200,
    description: 'Trip updated',
    example: {
      tripId: '123e4567-e89b-12d3-a456-426614174000',
    },
  })
  async updateTrip(
    @Param('trip_id') tripId: string,
    @Body() data: UpdateTripDto,
  ) {
    return this.tripsService.updateTrip(tripId, data);
  }
}
