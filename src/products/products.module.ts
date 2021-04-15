import { Module, HttpModule } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { AuthModule } from '../auth/auth.module';
import config from '../configs/config';

@Module({
  providers: [ProductsService],
  imports: [
    HttpModule.register({
      timeout: config.timeout,
      maxRedirects: config.retries,
    }),
    AuthModule,
  ],
  controllers: [ProductsController],
})
export class ProductsModule {}
