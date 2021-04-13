import * as dotenv from 'dotenv';

class Config {
  dbhost: string;
  secret: string;
  expire: number;
  urlShoppify: string;
  constructor() {
    dotenv.config();
    this.dbhost = process.env.DB_HOST;
    this.secret = process.env.SECRET;
    this.expire = parseInt(process.env.EXPIRE);
    this.urlShoppify = process.env.URL_SHOPIFY;
  }
}

export default new Config();
