import { Logger, Module } from '@nestjs/common';
import { TripsService } from './trips.service';
import { TripsController } from './trips.controller';
import { UsersModule } from 'src/users/users.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { NodemailerModule } from 'src/nodemailer/nodemailer.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [NodemailerModule, UsersModule, ConfigModule],
  controllers: [TripsController],
  providers: [TripsService, PrismaService, Logger],
  exports: [TripsService],
})
export class TripsModule {}
