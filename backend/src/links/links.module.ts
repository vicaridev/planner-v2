import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TripsModule } from 'src/trips/trips.module';
import { LinksController } from './links.controller';
import { LinksService } from './links.service';

@Module({
  controllers: [LinksController],
  providers: [LinksService, PrismaService],
  imports: [TripsModule],
})
export class LinksModule {}
