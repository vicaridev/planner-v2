import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { RegisterUserDto } from 'src/users/dto/createUser.dto';
import { LoginDto } from 'src/users/dto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @ApiOperation({ summary: 'Register user on database' })
  @ApiBody({ description: 'User data to be registered', type: RegisterUserDto })
  @ApiCreatedResponse({
    description: 'User created',
    example: {
      userId: 'a123e4567-e89b-12d3-a456-426614174000',
    },
  })
  async registerUser(@Body() data: RegisterUserDto) {
    return this.authService.registerUser(data);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login user on platform' })
  @ApiBody({ description: 'User data to be logged' })
  @ApiCreatedResponse({
    description: 'Logged',
    example: {
      access_token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    },
  })
  async login(@Body() data: LoginDto) {
    return this.authService.login(data);
  }
}
