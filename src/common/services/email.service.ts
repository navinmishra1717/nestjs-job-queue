import { Injectable } from "@nestjs/common";
import { EmailSendData } from "../interface/email.interface";
import { Queue } from "bull";
import { InjectQueue } from "@nestjs/bull";
import { EmailType } from "../enum/email-type.enum";

@Injectable()
export class EmailService {
  constructor(
    @InjectQueue("emailSending")
    private readonly emailQueue: Queue,
  ) {}
  async sendEmail<T extends EmailType>(emailType: T, data: EmailSendData[T]) {
    const job = await this.emailQueue.add(emailType, {
      ...data,
    });

    console.log(`Job ${job.id} has been added to the queue.`);

    return { jobId: job.id };
  }
}
