import {
  CreateUserParams,
  UpdateUserParams,
  User,
} from "../models/users.models";

export interface iGetUserRepository {
  getUsers(): Promise<User[]>;
}

export interface ICreateUserRepository {
  createUser(params: CreateUserParams): Promise<User>;
}

export interface iUpdateUserRepository {
  updateUser(params: UpdateUserParams, id: string): Promise<User>;
}

export interface iDeleteUserRepository {
  deleteUser(id: string): Promise<User>;
}
