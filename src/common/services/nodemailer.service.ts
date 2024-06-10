import { Injectable } from "@nestjs/common";
import * as nodemailer from "nodemailer";

@Injectable()
export class NodemailerService {
  private transporter: nodemailer.Transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "willandstate@gmail.com",
        pass: "kfnsxmjjiahgmmue",
      },
    });
  }

  sendEmail(to: string, subject: string, content: string) {
    const mailOptions = {
      from: "willandstate@gmail.com",
      to,
      subject,
      text: content,
    };
    return this.transporter.sendMail(mailOptions);
  }
}
