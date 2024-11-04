import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as fs from 'fs';

const httpsOptions = {
  key: fs.readFileSync('./secrets/cert-key.pem'),
  cert: fs.readFileSync('./secrets/cert.pem'),
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {httpsOptions,});
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true }),
  );
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
});
  await app.listen(3000);
}
bootstrap();