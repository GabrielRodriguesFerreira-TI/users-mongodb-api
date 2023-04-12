import validator from "validator";
import { HttpRequest, HttpResponse, iController } from "../../../typings";
import { ICreateUserRepository } from "../../interfaces/users.types";
import { CreateUserParams, User } from "../../models/users.models";
import { badRequest, created, serverError } from "../helpers";

export class CreateUserController implements iController {
  constructor(private readonly createUserRepository: ICreateUserRepository) {}

  async handle(
    httpRequest: HttpRequest<CreateUserParams>
  ): Promise<HttpResponse<User | string>> {
    try {
      const requiredFields = ["fistName", "lastName", "email", "password"];

      for (const field of requiredFields) {
        if (!httpRequest?.body?.[field as keyof CreateUserParams]?.length) {
          return badRequest(`Field ${field} is required`);
        }
      }

      const { body } = httpRequest;

      const emailIsValid = validator.isEmail(body?.email!);

      if (!emailIsValid) {
        return badRequest("E-mail is invalid");
      }

      const user = await this.createUserRepository.createUser(body!);

      return created<User>(user);
    } catch (error) {
      return serverError();
    }
  }
}
