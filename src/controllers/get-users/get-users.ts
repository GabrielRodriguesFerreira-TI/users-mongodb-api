import {
  iGetUserController,
  iGetUserRepository,
} from "../../interfaces/users.types";

export class GetUserController implements iGetUserController {
  constructor(private readonly getUsersRepository: iGetUserRepository) {}

  async handle() {
    try {
      const users = await this.getUsersRepository.getUsers();

      return {
        statusCode: 200,
        body: users,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: "Something went wrong.",
      };
    }
  }
}