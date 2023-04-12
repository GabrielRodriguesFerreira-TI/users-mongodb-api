import {
  CreateUserParams,
  UpdateUserParams,
  User,
} from "../models/users.models";
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

export interface iUpdateUserRepository {
  updateUser(params: UpdateUserParams, id: string): Promise<User>;
}

export interface iUpdateUserController {
  handle(
    httpRequest: HttpRequest<UpdateUserParams>
  ): Promise<HttpResponse<User>>;
}

export interface iDeleteUserRepository {
  deleteUser(id: string): Promise<User>;
}
