import { OnQueueActive, Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import { EmailType } from "../enum/email-type.enum";
import { EmailSendData } from "../interface/email.interface";
import { NodemailerService } from "../services/nodemailer.service";

@Processor("emailSending")
export class EmailConsumer {
  constructor(private readonly nodemailerService: NodemailerService) {}

  @OnQueueActive()
  onActive(job: Job) {
    console.log(
      `Processing job ${job.id} of type "${job.name}" with data ${JSON.stringify(job.data)}...`,
    );
  }

  @Process(EmailType.WELCOME)
  async sendWelcomeEmail(job: Job<EmailSendData[EmailType.WELCOME]>) {
    const {
      data: { email, name },
    } = job;

    this.nodemailerService.sendEmail(
      email,
      "Welcome!!",
      `Hello ${name}, welcome to our application!`,
    );
  }

  @Process(EmailType.RESET_PASSWORD)
  async sendResetPasswordEmail(
    job: Job<EmailSendData[EmailType.RESET_PASSWORD]>,
  ) {
    const {
      data: { email, name, token },
    } = job;

    // send the reset password email here
    // this.nodemailerService.sendEmail(
    //   email,
    //   "Reset Password!!",
    //   `Hello ${name}, this is your reset password token: ${token}`,
    // );
  }
}
