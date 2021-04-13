import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../users/user';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CredentialsDto } from './dto/credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  async signUp(user: User): Promise<User> {
    const salt: string = await bcrypt.genSalt();
    const password: string = await this.hashPassword(user.password, salt);
    Object.assign(user, { salt });
    Object.assign(user, { password });
    return await this.userService.criar(user);
  }

  async signIn(credentials: CredentialsDto) {
    const user = await this.userService.checkCredentials(credentials);

    if (user === null) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payLoad = {
      id: user._id,
    };

    const token = this.jwtService.sign(payLoad);
    return { token };
  }

  // async me(credentials: CredentialsDto)
  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
