import { Logger, Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { NodemailerConfigService } from './nodemailerConfig.service';
import { NodemailerService } from './nodemailer.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useClass: NodemailerConfigService,
    }),
  ],
  providers: [Logger, NodemailerService],
  exports: [NodemailerService],
})
export class NodemailerModule {}
