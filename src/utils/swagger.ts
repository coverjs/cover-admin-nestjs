import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CommonResponseVo } from '@/common/dto';

// 加载 swagger 文档
export const loadSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Cover Admin Service')
    .setDescription(
      'Coverjs后台服务端接口文档\n\n推荐使用<a href="https://apifox.com/apidoc/shared-aa58b273-f91f-4dd6-99f6-56e24d51461b">Apifox</a>查看更友好的接口文档'
    )
    .setTermsOfService('https://github.com/coverjs')
    .setVersion('1.0.0')
    .build();

  const documentFactory = () => {
    return SwaggerModule.createDocument(app, config, {
      extraModels: [CommonResponseVo],
      operationIdFactory: (controllerKey: string, methodKey: string) => {
        return methodKey;
      }
    });
  };
  SwaggerModule.setup('docs', app, documentFactory);
};
