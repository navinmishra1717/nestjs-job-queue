import { registerEnumType } from "@nestjs/graphql";

export enum EmailType {
  WELCOME = "welcome",
  RESET_PASSWORD = "reset_password",
}

registerEnumType(EmailType, {
  name: "EmailType",
});
