import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { UserDto } from '../users/dto/user.dto';
import { UserInterface } from '../users/interfaces/user.interface';
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

  async signUp(user: UserDto): Promise<UserInterface> {
    const email: string = user.email;
    if (await this.existEmail(email)) {
      throw new BadRequestException('Email já cadastrado');
    }
    const salt: string = await bcrypt.genSalt();
    const password: string = await this.hashPassword(user.password, salt);
    Object.assign(user, { salt });
    Object.assign(user, { password });
    return await this.userService.create(user);
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

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  private async existEmail(email: string): Promise<boolean> {
    const user = await this.userService.findByEmail(email);
    if (user) {
      return true;
    }
    return false;
  }
}
