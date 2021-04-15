import { Injectable } from '@nestjs/common';
import RabbitmqServer from '../rabbitmql-server';

@Injectable()
export class QueueService {
  private rabbitmql: RabbitmqServer;
  constructor() {
    this.rabbitmql = new RabbitmqServer('amqp://admin:admin@queue');
  }
  async publishInQueue(queue: string, message: string) {
    await this.rabbitmql.start();
    this.rabbitmql.publishInQueue(queue, message);
  }
}
