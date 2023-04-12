import { MongoClient } from "../../database/mongo";
import { iGetUserRepository } from "../../interfaces/users.types";
import { User } from "../../models/users.models";

export class MongoGetUsersRepository implements iGetUserRepository {
  async getUsers(): Promise<User[]> {
    const users = await MongoClient.db
      .collection<Omit<User, "id">>("users")
      .find({})
      .toArray();

    const user_result = users.map(({ _id, ...users }) => ({
      ...users,
      id: _id.toHexString(),
    }));

    return user_result;
  }
}
