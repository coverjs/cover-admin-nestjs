import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loadSwagger } from './utils/swagger';
import { Logger } from 'nestjs-pino';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true
  });

  // 配置日志
  app.useLogger(app.get(Logger));

  // 配置跨域
  app.enableCors();

  // 配置静态资源目录
  app.useStaticAssets(join(__dirname, `../${process.env.STATIC_DIRECTORY}`), {
    prefix: '/upload'
  });

  // 配置 swagger 文档
  loadSwagger(app);

  await app.listen(process.env.PORT ?? 1118);
}

bootstrap();
