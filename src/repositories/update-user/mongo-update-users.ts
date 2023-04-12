import { ObjectId } from "mongodb";
import { MongoClient } from "../../database/mongo";
import { iUpdateUserRepository } from "../../interfaces/users.types";
import { UpdateUserParams, User } from "../../models/users.models";

export class MongoUpdateUserRepository implements iUpdateUserRepository {
  async updateUser(params: UpdateUserParams, id: string): Promise<User> {
    await MongoClient.db.collection("users").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...params,
        },
      }
    );

    const user = await MongoClient.db
      .collection<Omit<User, "id">>("users")
      .findOne({ _id: new ObjectId(id) });

    if (!user) {
      throw new Error("User not updated");
    }

    const { _id, ...rest } = user;

    return { id: _id.toHexString(), ...rest };
  }
}
