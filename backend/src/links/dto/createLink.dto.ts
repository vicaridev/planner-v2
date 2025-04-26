import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl } from 'class-validator';

export class CreateLinkDto {
  @ApiProperty({
    example: 'Booking Confirmation',
    description: 'Title of the link',
  })
  @IsString()
  readonly title: string;

  @ApiProperty({
    example: 'https://example.com/booking-confirmation',
    description: 'URL of the link',
  })
  @IsUrl()
  readonly url: string;
}
