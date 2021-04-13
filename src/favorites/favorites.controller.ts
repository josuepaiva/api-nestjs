import { Controller, Body, Get, Param, Post, UseGuards } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { AuthGuard } from '@nestjs/passport';
import { Favorite } from './favorite';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}
  @Get(':id')
  @UseGuards(AuthGuard())
  async getAllFavorites(@Param('id') id: string): Promise<any[]> {
    return this.favoritesService.listarTodos(id);
  }
  @Post('/favorite')
  @UseGuards(AuthGuard())
  async favor(@Body() favorite: Favorite): Promise<{ message: string }> {
    await this.favoritesService.favoritar(favorite);
    return {
      message: 'Favoritado com sucesso',
    };
  }

  @Post('/disfavor')
  @UseGuards(AuthGuard())
  async disfavor(@Body() favorite: Favorite): Promise<{ message: string }> {
    await this.favoritesService.desFavoritar(favorite);
    return {
      message: 'Desfavoritado com sucesso',
    };
  }
}
