import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { User } from './user';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async listarTodos(): Promise<User[]> {
    return this.userService.listarTodos();
  }

  @Post()
  async criar(@Body() user: User): Promise<User> {
    return this.userService.criar(user);
  }

  @Get(':id')
  async buscarPorId(@Param('id') id: string): Promise<User> {
    return this.userService.buscarPorId(id);
  }

  @Put(':id')
  async atualizar(
    @Param('id') id: string,
    @Body() userAtualizado: User,
  ): Promise<User> {
    return this.userService.atualizar(id, userAtualizado);
  }

  @Delete(':id')
  async remover(@Param('id') id: string): Promise<User> {
    return this.userService.remover(id);
  }
}
