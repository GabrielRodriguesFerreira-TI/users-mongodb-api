import { MongoClient } from "../../database/mongo";
import { ICreateUserRepository } from "../../interfaces/users.types";
import { CreateUserParams, User } from "../../models/users.models";

export class MongoCreateUser implements ICreateUserRepository {
  async createUser(params: CreateUserParams): Promise<User> {
    const { insertedId } = await MongoClient.db
      .collection("users")
      .insertOne(params);

    const user = await MongoClient.db
      .collection<Omit<User, "id">>("users")
      .findOne({ _id: insertedId });

    if (!user) {
      throw new Error("user not created");
    }

    const { _id, ...users } = user;

    return { id: _id.toHexString(), ...users };
  }
}
