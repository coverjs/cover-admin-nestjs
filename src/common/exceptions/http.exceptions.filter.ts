import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import type { Request, Response } from 'express';
import { BusinessException } from './business.exceptions';
import { BUSINESS_ERROR_CODE } from './business.error.code';

/**
 *  HTTP 异常过滤器
 */
@Catch(HttpException)
export class HttpExeptionsFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const respones = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const error: any = exception.getResponse();

    // 处理自定义业务异常
    if (exception instanceof BusinessException) {
      respones.status(error?.statusCode || respones?.statusCode).send({
        code: error?.code,
        msg: error?.msg[(request.headers.lang as string) || 'zh-CN'] // 返回对应语言的异常信息
      });
      return;
    }
    // 其他异常使用通用状态码返回
    respones.status(error?.statusCode || respones?.statusCode).send({
      code: BUSINESS_ERROR_CODE.COMMON.code,
      msg: BUSINESS_ERROR_CODE.COMMON.msg[(request.headers.lang as string) || 'zh-CN'] // 返回对应语言的异常信息
    });
  }
}
