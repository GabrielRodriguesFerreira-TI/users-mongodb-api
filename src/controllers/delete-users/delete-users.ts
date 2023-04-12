import { HttpRequest, HttpResponse, iController } from "../../../typings";
import { iDeleteUserRepository } from "../../interfaces/users.types";
import { User } from "../../models/users.models";

export class DeleteUserController implements iController {
  constructor(private readonly deleteUserRepository: iDeleteUserRepository) {}
  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<User>> {
    try {
      const id = httpRequest.params.id;

      if (!id) {
        return {
          statusCode: 400,
          body: "Missing user id",
        };
      }

      const user = await this.deleteUserRepository.deleteUser(id);

      return {
        statusCode: 204,
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
