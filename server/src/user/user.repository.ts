import { inject, injectable } from "inversify";
import { MongoService } from "../database/mongo.service";
import { TYPES } from "../types";
import { User } from "./user.entity";
import { IUserRepository } from "./user.repository.interface";
import UserModel from '../database/models/user'

@injectable()
export class UserRepository implements IUserRepository {
  constructor (@inject(TYPES.MongoService) private mongoService: MongoService) {

  }
  async create (user: User): Promise<void> {
    const newUser = new UserModel({
      email: user.email,
      password: user.password,
      name: user.name,
    })
    await newUser.save()
  }
  async find (email: string): Promise<void | null> {

  }
}