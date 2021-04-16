import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import RabbitmqServer from './rabbitmql-server';
import EmailPromise from './email/emailPromise';
import config from './configs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configSwagger = new DocumentBuilder()
    .setTitle('Teste api example')
    .setDescription('The test API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api', app, document);

  await app.listen(config.port);
  const server = new RabbitmqServer(config.queueUrl);
  await server.start();
  await server.consume(config.queueName, ({ content }) => {
    EmailPromise.send(config.waitSendEmail, content.toString());
  });
}
bootstrap();
