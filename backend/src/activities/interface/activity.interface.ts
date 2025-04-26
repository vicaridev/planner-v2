import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsString, IsUUID } from 'class-validator';

export class Activity {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsUUID()
  readonly tripId: string;

  @ApiProperty({ example: 'a987f6543-e21b-43d2-b456-426614174999' })
  @IsString()
  readonly id: string;

  @ApiProperty({ example: 'Hiking in the mountains' })
  @IsString()
  readonly title: string;

  @ApiProperty({ example: '2024-08-30T10:00:00Z' })
  @IsDateString()
  readonly occursAt: Date;
}
