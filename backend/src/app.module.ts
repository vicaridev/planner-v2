import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TripsModule } from './trips/trips.module';
import { ActivitiesModule } from './activities/activities.module';
import { LinksModule } from './links/links.module';
import { AuthModule } from './auth/auth.module';
import { NodemailerModule } from './nodemailer/nodemailer.module';
import { ConfigModule } from '@nestjs/config';
import { ParticipantsModule } from './participants/participants.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './common/exceptions/custom-exceptions.filter';

@Module({
  imports: [
    UsersModule,
    TripsModule,
    ActivitiesModule,
    LinksModule,
    AuthModule,
    NodemailerModule,
    ConfigModule.forRoot(),
    ParticipantsModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
