import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as nodemailer from "nodemailer";

@Injectable()
export class NodemailerService {
  private transporter: nodemailer.Transporter;
  constructor(private readonly config: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: this.config.get("MAIL_SERVICE"),
      auth: {
        user: this.config.get("SMTP_USERNAME"),
        pass: this.config.get("SMTP_PASSWORD"),
      },
    });
  }

  sendEmail(to: string, subject: string, content: string) {
    const mailOptions = {
      from: this.config.get("SMTP_FROM"),
      to,
      subject,
      text: content,
    };
    return this.transporter.sendMail(mailOptions);
  }
}
