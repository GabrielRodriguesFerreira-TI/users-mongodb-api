import { iGetUserRepository } from "../../interfaces/users.types";
import { User } from "../../models/users.models";

export class MongoGetUsersRepository implements iGetUserRepository {
  async getUsers(): Promise<User[]> {
    return [
      {
        firstName: "Gabriel",
        lastName: "Ferreira",
        email: "gabrielrf@gmail.com",
        password: "123456",
      },
    ];
  }
}
