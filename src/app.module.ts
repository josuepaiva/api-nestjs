import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { FavoritesModule } from './favorites/favorites.module';
import { QueueModule } from './queue/queue.module';

import config from './configs/config';
@Module({
  imports: [
    MongooseModule.forRoot(config.dbhost),
    UsersModule,
    AuthModule,
    ProductsModule,
    FavoritesModule,
    QueueModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
