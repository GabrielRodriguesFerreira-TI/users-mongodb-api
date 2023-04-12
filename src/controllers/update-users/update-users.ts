import { HttpRequest, HttpResponse, iController } from "../../../typings";
import { iUpdateUserRepository } from "../../interfaces/users.types";
import { UpdateUserParams, User } from "../../models/users.models";

export class UpdateUserController implements iController {
  constructor(private readonly updateUserRepository: iUpdateUserRepository) {}
  async handle(
    httpRequest: HttpRequest<UpdateUserParams>
  ): Promise<HttpResponse<User>> {
    try {
      const id = httpRequest.params.id;
      const body = httpRequest?.body;

      if (!body) {
        return {
          statusCode: 400,
          body: "Missing fields",
        };
      }

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

      const user = await this.updateUserRepository.updateUser(
        id,
        body as unknown as keyof UpdateUserParams
      );

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
