import { HttpResponse, iController } from "../../../typings";
import { iGetUserRepository } from "../../interfaces/users.types";
import { User } from "../../models/users.models";
import { ok, serverError } from "../helpers";

export class GetUserController implements iController {
  constructor(private readonly getUsersRepository: iGetUserRepository) {}

  async handle(): Promise<HttpResponse<User[] | string>> {
    try {
      const users = await this.getUsersRepository.getUsers();

      return ok<User[]>(users);
    } catch (error) {
      return serverError();
    }
  }
}
