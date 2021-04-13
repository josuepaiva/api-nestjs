import { Injectable, HttpService } from '@nestjs/common';
const URL =
  'https://269a1ec67dfdd434dfc8622a0ed77768:4e788173c35d04421ab4793044be622f@send4-avaliacao.myshopify.com/admin/api/2020-01/products.json';

@Injectable()
export class ProductsService {
  constructor(private httpService: HttpService) {}

  async getAllProducts() {
    const response = await this.httpService.get(URL).toPromise();
    return response.data;
  }
}
