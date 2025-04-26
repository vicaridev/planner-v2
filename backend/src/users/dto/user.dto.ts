import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsString, IsUUID } from 'class-validator';

export class UserDto {
  @ApiProperty({
    example: 'a123e4567-e89b-12d3-a456-426614174000',
    description: 'Unique identifier for the user',
  })
  @IsUUID()
  readonly id: string;

  @ApiPropertyOptional({
    example: 'John Doe',
    description: "User's full name (optional)",
  })
  @IsString()
  readonly name: string;

  @ApiProperty({
    example: 'user@example.com',
    description: "User's email address",
  })
  @IsEmail()
  readonly email: string;
}
