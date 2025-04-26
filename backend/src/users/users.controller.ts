import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(readonly usersService: UsersService) {}

  @Get('/:user_id/me')
  @ApiOperation({ summary: 'Retrieve user information' })
  @ApiResponse({
    status: 200,
    type: UserDto,
  })
  async getUser(@Param('user_id') userId: string) {
    return this.usersService.findUserById(userId);
  }
}
