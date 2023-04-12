import { HttpRequest, HttpResponse, iController } from "../../../typings";
import { iUpdateUserRepository } from "../../interfaces/users.types";
import { UpdateUserParams, User } from "../../models/users.models";
import { badRequest, ok, serverError } from "../helpers";

export class UpdateUserController implements iController {
  constructor(private readonly updateUserRepository: iUpdateUserRepository) {}
  async handle(
    httpRequest: HttpRequest<UpdateUserParams>
  ): Promise<HttpResponse<User | string>> {
    try {
      const id = httpRequest.params.id;
      const body = httpRequest?.body;

      if (!body) {
        return badRequest("Missing fields.");
      }

      if (!id) {
        return badRequest("Missing user id.");
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
        return badRequest("Some receive field is not allowed");
      }

      const user = await this.updateUserRepository.updateUser(
        id,
        body as unknown as keyof UpdateUserParams
      );

      return ok<User>(user);
    } catch (error) {
      return serverError();
    }
  }
}
