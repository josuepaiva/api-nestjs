import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import RabbitmqServer from './rabbitmql-server';
import { Agenda } from 'agenda';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  const server = new RabbitmqServer('amqp://admin:admin@queue');
  await server.start();
  await server.consume('nest', (message) =>
    // (async function() {
    //   await Agenda.start(); // Start Agenda instance
    //   await Agenda.schedule('in 2 minutes', 'log hello medium', {name: 'Medium'}); // Run the dummy job in 10 minutes and passing data.
    // })();
    console.log(message.content.toString()),
  );
}
bootstrap();
