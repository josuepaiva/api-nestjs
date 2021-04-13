import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { Favorite, FavoriteSchema } from './favorite';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Favorite.name,
        schema: FavoriteSchema,
      },
    ]),
    AuthModule,
  ],
  providers: [FavoritesService],
  controllers: [FavoritesController],
})
export class FavoritesModule {}
