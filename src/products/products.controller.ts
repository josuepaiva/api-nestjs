import { Controller, Get, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @UseGuards(AuthGuard())
  async listarTodos() {
    return this.productsService.getAllProducts();
  }
}
