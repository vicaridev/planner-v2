import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString } from 'class-validator';

export class UpdateTripDto {
  @ApiPropertyOptional({
    example: 'Paris, France',
    description: 'New destination of the trip (optional)',
  })
  @IsString()
  @IsOptional()
  readonly destination?: string;

  @ApiPropertyOptional({
    example: '2024-09-01T10:00:00Z',
    description: 'New start date of the trip in ISO 8601 format (optional)',
  })
  @IsDateString()
  @IsOptional()
  readonly startsAt?: Date;

  @ApiPropertyOptional({
    example: '2024-09-10T18:00:00Z',
    description: 'New end date of the trip in ISO 8601 format (optional)',
  })
  @IsDateString()
  @IsOptional()
  readonly endsAt?: Date;
}
