import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Favorite } from './favorite';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectModel(Favorite.name) private favoriteModel: Model<Favorite>,
  ) {}
  async listarTodos(userId: string): Promise<any[]> {
    return this.favoriteModel.find({ userId }).exec();
  }

  async favoritar(favoritarDto: Favorite): Promise<Favorite> {
    const favorited = new this.favoriteModel(favoritarDto);
    return favorited.save();
  }

  async desFavoritar(favoritarDto: Favorite): Promise<Favorite> {
    const favoritedDeleted = this.favoriteModel
      .findOneAndDelete({ favoritarDto })
      .exec();
    return (await favoritedDeleted).remove();
  }
}
