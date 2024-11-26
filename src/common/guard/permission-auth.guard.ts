import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY, PERMISSION_KEY_METADATA } from '../constants';
import { LogicalEnum, PermissionObj } from '../decorators/permissions-auth.decorator';
import { UserInfoByParseToken } from '../dto';
import { BusinessException } from '../exceptions';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class PermissionAuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private redisService: RedisService
  ) { }

  async canActivate(context: ExecutionContext) {
    const permissionObj = this.reflector.getAllAndOverride<PermissionObj>(PERMISSION_KEY_METADATA, [
      context.getHandler(),
      context.getClass()
    ]);
    if (!permissionObj || !permissionObj.permissionArr.length)
      return true;

    // 获取公开状态
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass()
    ]);

    if (isPublic)
      return true;

    const request = context.switchToHttp().getRequest();
    const user: UserInfoByParseToken = request.user;

    const userInfo = await this.redisService.getUserInfo(user.id);
    const { permissions } = userInfo;

    // 用户如果是管理员直接放行
    if (permissions.includes('*:*:*'))
      return true;

    let result = false;
    if (permissionObj.logical === LogicalEnum.or) {
      // or 逻辑，只需匹配一个
      result = permissionObj.permissionArr.some(userPermission => {
        return permissions.includes(userPermission);
      });
    }
    else if (permissionObj.logical === LogicalEnum.and) {
      // and 逻缉，匹配全部
      result = permissionObj.permissionArr.every(userPermission => {
        return permissions.includes(userPermission);
      });
    }
    // 抛出异常
    if (!result)
      BusinessException.throwNoPermissionToOperate();

    return result;
  }
}
