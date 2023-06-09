import { ObjectId } from "mongodb";
import { MongoClient } from "../../database/mongo";
import { iDeleteUserRepository } from "../../interfaces/users.types";
import { User } from "../../models/users.models";

export class MongoDeleteUserRepository implements iDeleteUserRepository {
  async deleteUser(id: string): Promise<User> {
    const user = await MongoClient.db
      .collection<Omit<User, "id">>("users")
      .findOne({ _id: new ObjectId(id) });

    if (!user) {
      throw new Error("User not found.");
    }

    const { deletedCount } = await MongoClient.db
      .collection("users")
      .deleteOne({ _id: new ObjectId(id) });

    if (!deletedCount) {
      throw new Error("User not deleted");
    }

    const { _id, ...rest } = user;

    return {
      id: _id.toHexString(),
      ...rest,
    };
  }
}
