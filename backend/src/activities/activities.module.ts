import { Module } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { ActivitiesController } from './activities.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { TripsModule } from 'src/trips/trips.module';

@Module({
  controllers: [ActivitiesController],
  providers: [ActivitiesService, PrismaService],
  imports: [TripsModule],
})
export class ActivitiesModule {}
