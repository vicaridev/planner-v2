import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsString } from 'class-validator';

export class CreateActivityDto {
  @ApiProperty({
    example: 'Hiking in the mountains',
    description: 'Title of the activity',
  })
  @IsString()
  readonly title: string;

  @ApiProperty({
    example: '2024-08-30T10:00:00Z',
    description: 'Date and time when the activity occurs, in ISO 8601 format',
  })
  @IsDateString()
  readonly occursAt: Date;
}
