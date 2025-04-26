import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmail, IsUUID, ArrayNotEmpty } from 'class-validator';

export class InviteParticipantDto {
  @ApiProperty({
    example: 'h123e4567-e89b-12d3-a456-426614174000',
    description: 'Unique identifier for the trip',
  })
  @IsUUID()
  readonly tripId: string;

  @ApiProperty({
    example: ['invitee1@example.com', 'invitee2@example.com'],
    description: 'Array of emails to invite to the trip',
    type: [String],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsEmail({}, { each: true })
  readonly emailsToInvite: string[];
}
