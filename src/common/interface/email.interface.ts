import { EmailType } from "../enum/email-type.enum";

export interface EmailSendData {
  [EmailType.WELCOME]: {
    email: string;
    name: string;
  };
  [EmailType.RESET_PASSWORD]: {
    email: string;
    name: string;
    token: string;
  };
}
