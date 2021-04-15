import { Controller, Post, Get, Body, UseGuards, Req } from '@nestjs/common';
import { User } from '../users/user';
import { UserDto } from '../users/dto/user.dto';
import { CredentialsDto } from './dto/credentials.dto';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/signup')
  async signUp(@Body() user: UserDto): Promise<{ message: string }> {
    await this.authService.signUp(user);
    return {
      message: 'Cadastro realizado com sucesso',
    };
  }
  @Post('/sign')
  async signIn(
    @Body() credentials: CredentialsDto,
  ): Promise<{ token: string }> {
    return await this.authService.signIn(credentials);
  }
  @Get('/me')
  @UseGuards(AuthGuard())
  getMe(@Req() req): User {
    return req.user;
  }
}
