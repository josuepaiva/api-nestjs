import * as dotenv from 'dotenv';

class Config {
  dbhost: string;
  secret: string;
  expire: number;
  timeout: number;
  retries: number;
  port: number;
  waitSendEmail: number;
  queueName: string;
  queueUrl: string;
  exchangeName: string;
  urlShoppify: string;
  constructor() {
    dotenv.config();
    this.dbhost = process.env.DB_HOST;
    this.port = parseInt(process.env.PORT_SERVER);
    this.secret = process.env.SECRET;
    this.timeout = parseInt(process.env.TIMEOUT);
    this.expire = parseInt(process.env.EXPIRE);
    this.waitSendEmail = parseInt(process.env.WAIT_SEND_EMAIL);
    this.retries = parseInt(process.env.RETRIES);
    this.queueName = process.env.QUEUE_NAME;
    this.queueUrl = process.env.QUEUE_URL;
    this.exchangeName = process.env.EXCHANGE_NAME;
    this.urlShoppify = process.env.URL_SHOPIFY;
  }
}

export default new Config();
