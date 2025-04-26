import { MailerOptions, MailerOptionsFactory } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class NodemailerConfigService implements MailerOptionsFactory {
  private transporterOptions: MailerOptions;

  async createMailerOptions(): Promise<MailerOptions> {
    if (!this.transporterOptions) {
      const testAccount = await nodemailer.createTestAccount();

      this.transporterOptions = {
        transport: {
          host: 'smtp.ethereal.email',
          port: 587,
          secure: false,
          auth: {
            user: testAccount.user,
            pass: testAccount.pass,
          },
        },
      };
    }

    return this.transporterOptions;
  }
}
