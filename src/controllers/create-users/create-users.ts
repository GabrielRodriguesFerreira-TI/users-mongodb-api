import validator from "validator";
import { HttpRequest, HttpResponse, iController } from "../../../typings";
import { ICreateUserRepository } from "../../interfaces/users.types";
import { CreateUserParams, User } from "../../models/users.models";

export class CreateUserController implements iController {
  constructor(private readonly createUserRepository: ICreateUserRepository) {}

  async handle(
    httpRequest: HttpRequest<CreateUserParams>
  ): Promise<HttpResponse<User>> {
    try {
      const requiredFields = ["fistName", "lastName", "email", "password"];

      for (const field of requiredFields) {
        if (!httpRequest?.body?.[field as keyof CreateUserParams]?.length) {
          return {
            statusCode: 400,
            body: `Field ${field} is required`,
          };
        }
      }

      const { body } = httpRequest;

      const emailIsValid = validator.isEmail(body?.email!);

      if (!emailIsValid) {
        return {
          statusCode: 400,
          body: "E-mail is invalid",
        };
      }

      const user = await this.createUserRepository.createUser(body!);

      return {
        statusCode: 201,
        body: user,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: "Something went wrong.",
      };
    }
  }
}
