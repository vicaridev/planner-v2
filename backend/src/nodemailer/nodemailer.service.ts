import { Injectable, Logger } from '@nestjs/common';
import { CreateTripConfirmationEmail } from './dto/createTripConfirmation';
import dayjs from 'src/lib/dayjs';
import * as nodemailer from 'nodemailer';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class NodemailerService {
  private readonly logger: Logger = new Logger(NodemailerService.name);
  constructor(private readonly mailerService: MailerService) {}
  async confirmTripCreation(emailInfo: CreateTripConfirmationEmail) {
    const formattedStartDate = dayjs(emailInfo.startsAt).format('LL');
    const formattedEndDate = dayjs(emailInfo.endsAt).format('LL');

    const message = await this.mailerService.sendMail({
      from: {
        name: 'Equipe Plann.er',
        address: 'equipe@planner.com',
      },
      to: emailInfo.email,
      subject: `Confirme sua viagem para ${emailInfo.destination}`,
      html: `
                        <div style="font-family: sans-serif; font-size: 16px; line-height: 1.6">
                <p>
                    Você solicitou a criação de uma viagem para
                    <strong>${emailInfo.destination} </strong>
                    nas datas de <strong>${formattedStartDate}</strong> até <strong>${formattedEndDate}.</strong>
                </p>
                <p></p>
                <p>Para confirmar sua viagem, clique no link abaixo:</p>
                <p></p>
                <a href="${emailInfo.confirmationLink}">Confirmar viagem</a>

                <p>
                Caso esteja usando o dispositivo móvel, você também pode confirmar a criação
                da viagem pelos aplicativos:
                </p>
                <p></p>
                <p>
                Caso você não saiba do que se trata esse e-mail, apenas ignore esse e-mail.
            </p>
            </div>

            `.trim(),
    });
    this.logger.verbose(
      'Trip email confirmation sent, preview: ' +
        nodemailer.getTestMessageUrl(message),
    );
  }

  async inviteParticipant(emailInfo: CreateTripConfirmationEmail) {
    const formattedStartDate = dayjs(emailInfo.startsAt).format('LL');
    const formattedEndDate = dayjs(emailInfo.endsAt).format('LL');

    const message = await this.mailerService.sendMail({
      from: {
        name: 'Equipe Plann.er',
        address: 'equipe@planner.com',
      },
      to: emailInfo.email,
      subject: `Confirme sua viagem para ${emailInfo.destination}`,
      html: `
                        <div style="font-family: sans-serif; font-size: 16px; line-height: 1.6">
                        <p>
                            Você foi convidado(a) para participar de uma viagem para
                            <strong>${emailInfo.destination} </strong>
                            nas datas de <strong>${formattedStartDate}</strong> até <strong>${formattedEndDate}.</strong>
                        </p>
                        <p></p>
                        <p>Para confirmar sua presença na viagem, clique no link abaixo:</p>
                        <p></p>
                        <a href="${emailInfo.confirmationLink}">Confirmar viagem</a>
        
                        <p>
                        Caso esteja usando o dispositivo móvel, você também pode confirmar a criação
                        da viagem pelos aplicativos:
                        </p>
                        <p></p>
                        <p>
                        Caso você não saiba do que se trata esse e-mail, apenas ignore esse e-mail.
                    </p>
                    </div>
        
                    `.trim(),
    });
    this.logger.verbose(
      'Invite email sent, preview: ' + nodemailer.getTestMessageUrl(message),
    );
  }
}
