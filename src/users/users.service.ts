import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user';
import { UserDto } from './dto/user.dto';
import { UserInterface } from './interfaces/user.interface';
import { CredentialsDto } from '../auth/dto/credentials.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async listAll(): Promise<UserInterface[]> {
    return this.userModel.find().exec();
  }

  async create(user: UserDto): Promise<UserInterface> {
    console.log('user created ', user);
    const userCreated = new this.userModel(user);
    return userCreated.save();
  }

  async findById(id: string): Promise<UserInterface> {
    return this.userModel.findById(id, { password: 0, __v: 0, salt: 0 }).exec();
  }

  async findByEmail(email: string): Promise<UserInterface> {
    return this.userModel.findOne({ email }).exec();
  }

  async checkCredentials(credentials: CredentialsDto): Promise<UserInterface> {
    const { email, password } = credentials;
    const user: UserInterface = await this.findByEmail(email);
    console.log('checkCredentials', user);
    if (user && (await this.checkPassword(password, user))) {
      return user;
    } else {
      return null;
    }
  }

  async update(id: string, user: UserDto): Promise<UserInterface> {
    return this.userModel.findByIdAndUpdate(id, user).exec();
  }

  async remove(id: string) {
    const userDeleted = this.userModel.findOneAndDelete({ _id: id }).exec();

    return (await userDeleted).remove();
  }

  private async checkPassword(
    passwordInput: string,
    user: UserInterface,
  ): Promise<boolean> {
    const { salt, password } = user;
    const hash = await bcrypt.hash(passwordInput, salt);
    return hash === password;
  }
}
