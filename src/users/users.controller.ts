import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { User } from './user';
import { UsersService } from './users.service';
import { UserInterface } from '../users/interfaces/user.interface';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard())
  async listAll(): Promise<UserInterface[]> {
    return this.userService.listAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  async findById(@Param('id') id: string): Promise<UserInterface> {
    return this.userService.findById(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard())
  async update(
    @Param('id') id: string,
    @Body() userAtualizado: User,
  ): Promise<UserInterface> {
    return this.userService.update(id, userAtualizado);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  async remove(@Param('id') id: string): Promise<UserInterface> {
    return this.userService.remove(id);
  }
}
