import { Module, HttpModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { User, UserSchema } from '../users/user';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { QueueService } from '../queue/queue.service';
import { ProductsService } from '../products/products.service';
import config from '../configs/config';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    HttpModule.register({
      timeout: config.timeout,
      maxRedirects: config.retries,
    }),
    AuthModule,
  ],
  providers: [FavoritesService, QueueService, ProductsService],
  controllers: [FavoritesController],
})
export class FavoritesModule {}
