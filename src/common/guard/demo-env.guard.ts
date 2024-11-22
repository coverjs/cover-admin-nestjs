import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DEMO, NODE_ENV } from '../constants';
import { BusinessException } from '../exceptions';
/**
 * 演示环境守卫
 */
@Injectable()
export class DemoEnvGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isDemoEnvironment = this.configService.get(NODE_ENV) === DEMO;
    if (!isDemoEnvironment) return true;
    const request: Request = context.switchToHttp().getRequest();
    const allowUrlArr = ['/auth/login', '/auth/logout']; //放过的路由

    // 如果是演示环境，只允许GET请求和登录、登出接口
    if (request.method !== 'GET' && !allowUrlArr.includes(request.url)) {
      BusinessException.throwDemoEnvForbidden();
    }
    return true;
  }
}
