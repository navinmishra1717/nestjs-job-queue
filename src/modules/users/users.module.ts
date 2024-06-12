import { Module } from "@nestjs/common";
import { BullModule } from "@nestjs/bull";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { UsersService } from "./users.service";
import { UsersResolver } from "./users.resolver";
import { EmailService } from "src/common/services/email.service";
import { BullBoardModule } from "@bull-board/nestjs";
import { EmailConsumer } from "src/common/jobs/email.consumer";
import { NodemailerService } from "src/common/services/nodemailer.service";

@Module({
  imports: [
    BullModule.registerQueue({
      name: "emailSending",
    }),

    BullBoardModule.forFeature({
      name: "emailSending",
      adapter: BullMQAdapter,
    }),
  ],
  providers: [
    UsersResolver,
    UsersService,
    EmailService,
    EmailConsumer,
    NodemailerService,
  ],
})
export class UsersModule {}
