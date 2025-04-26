import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ParticipantsService } from './participants.service';
import { InviteParticipantDto } from './dto/inviteParticipant';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Participant } from './interface/participant.interface';
import { Trip } from 'src/trips/interface/trip.interface';

@ApiTags('participants')
@Controller('/participants')
export class ParticipantsController {
  constructor(private readonly userTripsService: ParticipantsService) {}

  @Get('/:participant_id/confirm')
  @ApiOperation({ summary: 'Confirm participant on trip' })
  @ApiResponse({
    status: 200,
    description: 'Participation confirmed',
    type: Participant,
  })
  async confirmTripParticipation(
    @Param('trip_id') tripId: string,
    @Param('participant_id') participantId: string,
  ) {
    return await this.userTripsService.confirmTripParticipation(
      tripId,
      participantId,
    );
  }

  @Get('/:participant_id')
  @ApiOperation({ summary: 'Return participant based on ID passed on params' })
  @ApiResponse({
    status: 200,
    description: 'Participant found',
    type: Participant,
  })
  async findParticipantById(@Param('participant_id') participantId: string) {
    return await this.userTripsService.findParticipantById(participantId);
  }

  @Post('/invite')
  @ApiOperation({ summary: 'Invite new participants to the trip' })
  @ApiBody({
    description: 'Details to invite new participants',
    type: InviteParticipantDto,
  })
  @ApiResponse({
    status: 201,
    type: [Participant],
  })
  async inviteParticipant(
    @Param('trip_id') tripId: string,
    @Body() emailsToInvite: string[],
  ) {
    return await this.userTripsService.inviteParticipant(
      tripId,
      emailsToInvite,
    );
  }

  @Delete('/:participant_id')
  @ApiOperation({ summary: 'Removes a participant from the trip' })
  @ApiResponse({
    status: 200,
    example: {
      participantId: 'e123e4567-e89b-12d3-a456-426614174000',
    },
  })
  async deleteParticipant(
    @Param('trip_id') tripId: string,
    @Param('participant_id') participantId: string,
  ) {
    return this.userTripsService.removeParticipant(tripId, participantId);
  }

  @Get()
  @ApiOperation({ summary: 'List trip participants' })
  @ApiResponse({
    status: 200,
    type: [Participant],
  })
  async listParticipants(@Param('trip_id') tripId: string) {
    return this.userTripsService.listParticipants(tripId);
  }

  @Get('/:participant_id/trips')
  @ApiOperation({ summary: 'List participant trips' })
  @ApiResponse({
    status: 200,
    type: [Trip],
  })
  async listTripsByUserId(@Param('participant_id') userId: string) {
    return this.userTripsService.listTripsByUserId(userId);
  }
}
