import process from 'node:process';
import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';
import { loadSwagger } from './utils/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true
  });
  app.useLogger(app.get(Logger));
  app.enableCors();

  // load swagger docs
  loadSwagger(app);

  await app.listen(process.env.PORT ?? 1118);
}

bootstrap();
