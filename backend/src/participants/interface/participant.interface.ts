import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsUUID } from 'class-validator';

export class Participant {
  @ApiProperty({
    example: 'e123e4567-e89b-12d3-a456-426614174000',
    description: 'Unique identifier for the participant',
  })
  @IsUUID()
  readonly id: string;

  @ApiProperty({
    example: 'f987f6543-e21b-43d2-b456-426614174999',
    description:
      'Unique identifier for the user (or null if not linked to a user)',
    nullable: true,
  })
  @IsUUID()
  readonly userId: string | null;

  @ApiProperty({
    example: 'g123e4567-e89b-12d3-a456-426614174000',
    description: 'Unique identifier for the trip',
  })
  @IsUUID()
  readonly tripId: string;

  @ApiProperty({
    example: 'participant@example.com',
    description: 'Email of the participant',
  })
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    example: false,
    description: 'Indicates whether the participant is the owner of the trip',
  })
  @IsBoolean()
  readonly isOwner: boolean;

  @ApiProperty({
    example: true,
    description:
      'Indicates whether the participant has confirmed their participation',
  })
  @IsBoolean()
  readonly isConfirmed: boolean;
}
