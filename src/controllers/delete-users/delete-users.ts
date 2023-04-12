import { HttpRequest, HttpResponse, iController } from "../../../typings";
import { iDeleteUserRepository } from "../../interfaces/users.types";
import { User } from "../../models/users.models";
import { badRequest, ok, serverError } from "../helpers";

export class DeleteUserController implements iController {
  constructor(private readonly deleteUserRepository: iDeleteUserRepository) {}
  async handle(
    httpRequest: HttpRequest<any>
  ): Promise<HttpResponse<User | string>> {
    try {
      const id = httpRequest.params.id;

      if (!id) {
        return badRequest("Missing user id");
      }

      const user = await this.deleteUserRepository.deleteUser(id);

      return ok<User>(user);
    } catch (error) {
      return serverError();
    }
  }
}
