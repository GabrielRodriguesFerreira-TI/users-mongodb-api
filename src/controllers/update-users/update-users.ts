import { HttpRequest, HttpResponse } from "../../../typings";
import {
  iUpdateUserController,
  iUpdateUserRepository,
} from "../../interfaces/users.types";
import { UpdateUserParams, User } from "../../models/users.models";

export class UpdateUserController implements iUpdateUserController {
  constructor(private readonly updateUserRepository: iUpdateUserRepository) {}
  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<User>> {
    try {
      const id = httpRequest.params.id;
      const body = httpRequest.body;

      if (!id) {
        return {
          statusCode: 400,
          body: "Missing user id",
        };
      }

      const allowedFieldsToUpdate: (keyof UpdateUserParams)[] = [
        "firstName",
        "lastName",
        "password",
      ];

      const someFieldNotAllowedToUpdate = Object.keys(body!).some(
        (key) => !allowedFieldsToUpdate.includes(key as keyof UpdateUserParams)
      );

      if (someFieldNotAllowedToUpdate) {
        return {
          statusCode: 400,
          body: "Some receive field is not allowed",
        };
      }

      const user = await this.updateUserRepository.updateUser(id, body);

      return {
        statusCode: 200,
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
