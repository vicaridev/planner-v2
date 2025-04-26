import { Logger, Module } from '@nestjs/common';
import { ParticipantsService } from './participants.service';
import { ParticipantsController } from './participants.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { TripsModule } from 'src/trips/trips.module';
import { NodemailerModule } from 'src/nodemailer/nodemailer.module';

@Module({
  imports: [ConfigModule, TripsModule, NodemailerModule],
  controllers: [ParticipantsController],
  providers: [ParticipantsService, PrismaService, Logger],
  exports: [ParticipantsService],
})
export class ParticipantsModule {}
