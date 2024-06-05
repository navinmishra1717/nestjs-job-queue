import { EmailType } from "../enum/email-type.enum";

export interface IMail {
  to: string;
  subject: string;
  text: string;
  [key: string]: any;
}

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
