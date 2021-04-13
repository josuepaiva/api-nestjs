import { Module, HttpModule } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { AuthModule } from '../auth/auth.module';
@Module({
  providers: [ProductsService],
  imports: [
    HttpModule.register({
      timeout: 3000,
      maxRedirects: 3,
    }),
    AuthModule,
  ],
  controllers: [ProductsController],
})
export class ProductsModule {}
