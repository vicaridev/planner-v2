import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl, IsUUID } from 'class-validator';

export class Link {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsUUID()
  readonly tripId: string;

  @ApiProperty({ example: 'b987f6543-e21b-43d2-b456-426614174999' })
  @IsUUID()
  readonly id: string;

  @ApiProperty({ example: 'Travel Itinerary' })
  @IsString()
  readonly title: string;

  @ApiProperty({ example: 'https://example.com/travel-itinerary' })
  @IsUrl()
  readonly url: string;
}
