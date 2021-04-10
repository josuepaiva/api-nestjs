import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// Importamos o módulo do Mongoose
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';

import config from './config/config';
console.log(config);
@Module({
  imports: [MongooseModule.forRoot(config.dbhost), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
