import * as dotenv from 'dotenv';

class Config {
  dbhost: string;
  constructor() {
    dotenv.config();
    this.dbhost = process.env.DB_HOST;
  }
}

export default new Config();
