import { OnQueueActive, Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import { EmailType } from "../enum/email-type.enum";
import { EmailSendData, IMail } from "../interface/email.interface";
import { NodemailerService } from "../services/nodemailer.service";

@Processor("emailSending")
export class EmailConsumer {
  constructor(private readonly nodemailerService: NodemailerService) {}

  @OnQueueActive()
  onActive(job: Job) {
    console.log(
      `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
    );
  }

  @Process(EmailType.WELCOME)
  async sendWelcomeEmail(job: Job<EmailSendData[EmailType.WELCOME]>) {
    console.log(1111111111);
    console.log(job.data, "job data");
    const {
      data: { email, name },
    } = job;

    this.nodemailerService.sendEmail(
      email,
      "Welcome!!",
      `Hello ${name}, welcome to our application!`,
    );
  }

  async sendResetPasswordEmail(job: Job<IMail>) {
    const { data } = job;
    // send the reset password email here
  }
}
