import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterUserDto } from 'src/users/dto/createUser.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from 'src/users/dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ParticipantsService } from 'src/participants/participants.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    readonly jwtService: JwtService,
    readonly participantsService: ParticipantsService,
  ) {}

  async registerUser(data: RegisterUserDto) {
    try {
      const password = await bcrypt.hash(data.password, 10);
      data.password = password;
      const user = await this.usersService.createUser(data);
      if (user instanceof Error) throw new BadRequestException(user.message);

      // await this.

      return { userId: user.id };
    } catch (error) {
      throw new InternalServerErrorException('Failed to register user', error);
    }
  }

  async login(data: LoginDto) {
    const user = await this.usersService.findUserByEmail(data.email);

    if (user instanceof Error) {
      throw new NotFoundException('User not found');
    }

    const isMatch = bcrypt.compareSync(data.password, user!.password);

    if (!isMatch) {
      throw new UnauthorizedException('Incorrect password');
    }

    const payload = { sub: user!.id, username: user!.name };
    const token = await this.jwtService.signAsync(payload);

    return {
      user: {
        name: user!.name,
        id: user!.id,
        email: user!.email,
      },
      token: token,
    };
  }
}
