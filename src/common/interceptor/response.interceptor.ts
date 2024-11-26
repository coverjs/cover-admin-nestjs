import { filterValue } from '@/utils/format';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// 包装结果，将请求成功的返回结果格式统一包装起来，放入 data
@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(_: ExecutionContext, next: CallHandler): Observable<any> {
    // const ResponseObj = context.switchToHttp().getResponse();
    // ResponseObj.setHeader('Cache-Control', 'no-cache, no-store, max-age=0, must-revalidate');
    return next.handle().pipe(
      map(data => {
        const finalData = filterValue(data);
        return {
          code: 0,
          data: finalData,
          msg: 'ok'
        };
      })
    );
  }
}
