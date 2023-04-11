import { User } from "../models/users.models";
import { HttpResponse } from "../../typings";

export interface iGetUserController {
  handle(): Promise<HttpResponse<User[]>>;
}

export interface iGetUserRepository {
  getUsers(): Promise<User[]>;
}
