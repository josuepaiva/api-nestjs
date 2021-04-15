import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, ForbiddenException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import config from '../configs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.secret,
    });
  }
  async validate(payload: { id: string }) {
    const { id } = payload;
    const user = await this.userService.findById(id);
    if (!user) {
      throw new ForbiddenException('Usuário não encontrado');
    }
    return user;
  }
}
