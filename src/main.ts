import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loadSwagger } from './utils/swagger';
import { Logger } from 'nestjs-pino';

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
