import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user';
import { CredentialsDto } from '../auth/dto/credentials.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async listarTodos(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async criar(user: User): Promise<User> {
    const userCreated = new this.userModel(user);
    return userCreated.save();
  }

  async buscarPorId(id: string): Promise<User> {
    return this.userModel.findById(id, { password: 0, __v: 0, salt: 0 }).exec();
  }

  async buscarPorEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }

  async checkCredentials(credentials: CredentialsDto): Promise<User> {
    const { email, password } = credentials;
    const user: User = new this.userModel(await this.buscarPorEmail(email));

    if (user && (await this.checkPassword(password, user))) {
      return user;
    } else {
      return null;
    }
  }

  async atualizar(id: string, User: User): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, User).exec();
  }

  async remover(id: string) {
    const userDeleted = this.userModel.findOneAndDelete({ _id: id }).exec();

    return (await userDeleted).remove();
  }

  private async checkPassword(
    passwordInput: string,
    user: User,
  ): Promise<boolean> {
    const { salt, password } = user;
    const hash = await bcrypt.hash(passwordInput, salt);
    return hash === password;
  }
}
