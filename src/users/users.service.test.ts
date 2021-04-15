import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './user';

@Injectable()
export default class UserTestService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async drop() {
    await this.userModel.deleteMany({});
  }

  async create(user) {
    return this.userModel.create(user);
  }
}
