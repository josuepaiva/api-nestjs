import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// Importamos o módulo do Mongoose
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { FavoritesModule } from './favorites/favorites.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { mailerConfig } from './configs/mailer.config';

import config from './configs/config';

@Module({
  imports: [
    MongooseModule.forRoot(config.dbhost),
    MailerModule.forRoot(mailerConfig),
    UsersModule,
    AuthModule,
    ProductsModule,
    FavoritesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
