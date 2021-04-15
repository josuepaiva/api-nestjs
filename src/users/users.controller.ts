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

import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'get all users' })
  @ApiResponse({
    status: 200,
    description: 'The users found',
    type: [User],
  })
  async listAll(): Promise<UserInterface[]> {
    return this.userService.listAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'get user by id' })
  @ApiResponse({
    status: 200,
    description: 'The found user',
    type: User,
  })
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
