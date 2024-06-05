import { Injectable } from "@nestjs/common";
import { CreateUserInput } from "./dto/create-user.input";
import { UpdateUserInput } from "./dto/update-user.input";
import { EmailService } from "src/common/services/email.service";
import { EmailType } from "src/common/enum/email-type.enum";

@Injectable()
export class UsersService {
  constructor(private readonly emailService: EmailService) {}

  /**
   * Creates a new user and adds them to the Redis store.
   * @param {CreateUserInput} createUserInput - The input data for creating a user.
   * @returns {CreateUserInput} The created user.
   */
  async create(createUserInput: CreateUserInput): Promise<CreateUserInput> {
    const { name, email } = createUserInput;
    await this.emailService.sendEmail<EmailType.WELCOME>(EmailType.WELCOME, {
      email,
      name,
      // to: email,
      // subject: "Welcome!!",
      // text: `Hello ${name}, welcome to our application!`,
      // email,
      // name,
    });
    return createUserInput;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
