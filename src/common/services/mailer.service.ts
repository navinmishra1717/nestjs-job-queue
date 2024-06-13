import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";

@Injectable()
export class NestMailerService {
  constructor(private mailerService: MailerService) {}

  sendEmail(
    to: string,
    subject: string,
    template: string,
    context: {
      [key: string]: any;
    },
  ) {
    this.mailerService.sendMail({
      to,
      subject,
      template,
      context,
    });
  }
}
