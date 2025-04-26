import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTripDto {
  @ApiProperty()
  @IsNotEmpty()
  ownerId: string;

  @ApiProperty()
  ownerName: string;

  @ApiProperty()
  ownerEmail: string;

  @IsNotEmpty()
  @ApiProperty()
  destination: string;

  @IsNotEmpty()
  @ApiProperty()
  startsAt: Date;

  @IsNotEmpty()
  @ApiProperty()
  endsAt: Date;

  @IsNotEmpty()
  @ApiProperty()
  emailsToInvite: string[];
}
