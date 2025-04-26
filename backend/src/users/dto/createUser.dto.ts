import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterUserDto {
  @ApiProperty({
    example: 'user@example.com',
    description: "User's email address",
  })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiPropertyOptional({
    example: 'John Doe',
    description: "User's full name (optional)",
  })
  @IsString()
  readonly name: string;

  @ApiPropertyOptional({
    example: 'securePassword123',
    description: "User's password (optional)",
  })
  @IsString()
  password: string;
}
