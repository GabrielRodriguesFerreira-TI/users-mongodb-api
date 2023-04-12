import { CreateUserParams, User } from "../models/users.models";
import { HttpRequest, HttpResponse } from "../../typings";

export interface iGetUserController {
  handle(): Promise<HttpResponse<User[]>>;
}

export interface iGetUserRepository {
  getUsers(): Promise<User[]>;
}

export interface ICreateUserRepository {
  createUser(params: CreateUserParams): Promise<User>;
}

export interface iCreateUserController {
  handle(
    httpRequest: HttpRequest<CreateUserParams>
  ): Promise<HttpResponse<User>>;
}
