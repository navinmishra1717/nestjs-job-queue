import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersResolver } from "./users.resolver";
import { BullModule } from "@nestjs/bull";
import { EmailService } from "src/common/services/email.service";

@Module({
  imports: [
    BullModule.registerQueue({
      name: "emailSending",
    }),
  ],
  providers: [UsersResolver, UsersService, EmailService],
})
export class UsersModule {}
