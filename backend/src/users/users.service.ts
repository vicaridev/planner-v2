import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterUserDto } from './dto/createUser.dto';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  readonly logger: Logger = new Logger(UsersService.name);
  constructor(readonly prismaService: PrismaService) {}

  async createUser(data: RegisterUserDto): Promise<User | Error>;
  async createUser(email: string): Promise<User | Error>;
  async createUser(
    data: RegisterUserDto | string,
  ): Promise<User | undefined | Error> {
    try {
      let email: string;

      if (typeof data === 'string') {
        email = data;
        return;
      }
      email = data.email;
      const name = data.name;
      const password = data.password;

      const user = await this.prismaService.user.findUnique({
        where: {
          email: email,
        },
      });

      if (user) throw new BadRequestException('User already exists');

      const newUser = await this.prismaService.user.create({
        data: {
          name: name,
          email: email,
          password: password,
        },
      });

      return newUser;
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to create user', error);
    }
  }

  async findUserByEmail(email: string): Promise<User | Error | null> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          email: email,
        },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return user;
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to find user', error);
    }
  }

  async findUserById(id: string): Promise<User | Error | null> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          id: id,
        },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return user;
    } catch (error) {
      throw new InternalServerErrorException('Failed to find user', error);
    }
  }
}
