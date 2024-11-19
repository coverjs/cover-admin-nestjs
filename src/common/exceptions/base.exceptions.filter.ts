import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, ServiceUnavailableException } from '@nestjs/common';

/*
 * 非 HTTP 标准的异常过滤器 (代码逻辑错误)
 */
@Catch(Error)
export class BaseExceptionsFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const exResponse = new ServiceUnavailableException().getResponse();
    if (typeof exResponse === 'string') {
      response.status(HttpStatus.SERVICE_UNAVAILABLE).send({
        statusCode: HttpStatus.SERVICE_UNAVAILABLE,
        timestamp: new Date().toISOString(),
        path: request.url,
        msg: new ServiceUnavailableException().getResponse()
      });
    } else {
      response.status(HttpStatus.SERVICE_UNAVAILABLE).send({
        statusCode: HttpStatus.SERVICE_UNAVAILABLE,
        timestamp: new Date().toISOString(),
        path: request.url,
        ...(new ServiceUnavailableException().getResponse() as any)
      });
    }
  }
}
