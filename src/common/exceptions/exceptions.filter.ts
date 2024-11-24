import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import type { Request, Response } from 'express';
import { BusinessException } from './business.exceptions';
import { Logger } from 'nestjs-pino';
import { ERROR_CODE } from '../error-codes';

/**
 * 异常过滤器
 */
@Catch(HttpException, Error)
export class ExeptionsFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const respones = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // 处理自定义业务异常
    if (exception instanceof BusinessException) {
      const error: any = exception.getResponse();
      respones.status(error?.statusCode || respones?.statusCode).send({
        code: error?.code,
        msg: error?.msg[(request.headers.lang as string) || 'zh-CN'] // 返回对应语言的异常信息
      });
      return;
    }

    this.logger.error(
      `
path: ${request.url}
method: ${request.method}
ip:	${request.ip}
userInfo: ${JSON.stringify((request as any)?.user)}
error: ${exception}
`
    );
    // 其他异常使用通用状态码返回
    respones.status(HttpStatus.OK).send({
      code: ERROR_CODE.COMMON.code,
      msg: ERROR_CODE.COMMON.msg[(request.headers.lang as string) || 'zh-CN'] // 返回对应语言的异常信息
    });
  }
}
