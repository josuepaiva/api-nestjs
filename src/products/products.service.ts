import { Injectable, HttpService } from '@nestjs/common';
import config from '../configs/config';
const URL = config.urlShoppify;
@Injectable()
export class ProductsService {
  constructor(private httpService: HttpService) {}

  async getAllProducts() {
    const response = await this.httpService.get(URL).toPromise();
    return response.data;
  }

  async getById(id: string) {
    const result = URL.split('.json');
    const url = `${result[0]}/${id}.json`;
    const response = await this.httpService.get(url).toPromise();
    return response.data;
  }

  async existProduct(id: string): Promise<boolean> {
    const result = URL.split('.json');
    const url = `${result[0]}/${id}.json`;
    try {
      const response = await this.httpService.get(url).toPromise();
      if (response) {
        return true;
      }
    } catch (e) {
      return false;
    }
  }
}
