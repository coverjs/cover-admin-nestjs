import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { BUSINESS_ERROR_CODE } from './business.error.code';
import { Logger } from 'nestjs-pino';

/*
 * 非 HTTP 标准的异常过滤器 (代码逻辑错误)
 */
@Catch(Error)
export class BaseExceptionsFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    this.logger.error(
      `${request.url}\n${request.method}\n${request.ip}\n${request.headers['user-agent']}\n${exception}`
    );
    response.status(HttpStatus.OK).send({
      code: BUSINESS_ERROR_CODE.COMMON.code,
      msg: BUSINESS_ERROR_CODE.COMMON.msg[(request.headers.lang as string) || 'zh-CN'] // 返回对应语言的异常信息
    });
  }
}
