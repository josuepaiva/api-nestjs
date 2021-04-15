import {
  Controller,
  Body,
  Get,
  Req,
  Post,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { FavoritesService } from './favorites.service';
import { QueueService } from '../queue/queue.service';
import { AuthGuard } from '@nestjs/passport';
import { FavoriteDto } from './dto/favorite.dto';
import config from '../configs/config';

@ApiTags('favorites')
@Controller('favorites')
export class FavoritesController {
  constructor(
    private readonly favoritesService: FavoritesService,
    private queueRabbit: QueueService,
  ) {}
  @Get()
  @UseGuards(AuthGuard())
  async getAllFavorites(@Req() { user }): Promise<any[]> {
    if (user === null) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
    const userId: string = user.id;
    const favorites = await this.favoritesService.listarFavorites(userId);
    return favorites;
  }
  @Post('/favorite')
  @UseGuards(AuthGuard())
  async favor(
    @Req() { user },
    @Body() favorite: FavoriteDto,
  ): Promise<{ message: string }> {
    if (user === null) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const userId: string = user.id;
    Object.assign(favorite, { userId });

    if ((await this.favoritesService.favoritar(favorite)) === 1) {
      const products = await this.favoritesService.listarFavorites(userId);
      await this.queueRabbit.publishInQueue(
        config.queueName,
        JSON.stringify({ user, products }),
      );
      return {
        message: 'Favoritado com sucesso',
      };
    }
    return {
      message: 'Falha ao favoritar produto',
    };
  }

  @Post('/disfavor')
  @UseGuards(AuthGuard())
  async disfavor(
    @Req() { user },
    @Body() favorite: FavoriteDto,
  ): Promise<{ message: string }> {
    if (user === null) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
    const userId: string = user.id;
    Object.assign(favorite, { userId });

    if ((await this.favoritesService.desFavoritar(favorite)) === 1) {
      const products = await this.favoritesService.listarFavorites(userId);
      await this.queueRabbit.publishInQueue(
        config.queueName,
        JSON.stringify({ user, products }),
      );
      return {
        message: 'Desfavoritado com sucesso',
      };
    }
    return {
      message: 'Falha ao desfavoritar',
    };
  }
}
