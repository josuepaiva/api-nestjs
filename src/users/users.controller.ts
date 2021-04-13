import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { User } from './user';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard())
  async listarTodos(): Promise<User[]> {
    return this.userService.listarTodos();
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  async buscarPorId(@Param('id') id: string): Promise<User> {
    return this.userService.buscarPorId(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard())
  async atualizar(
    @Param('id') id: string,
    @Body() userAtualizado: User,
  ): Promise<User> {
    return this.userService.atualizar(id, userAtualizado);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  async remover(@Param('id') id: string): Promise<User> {
    return this.userService.remover(id);
  }
}
