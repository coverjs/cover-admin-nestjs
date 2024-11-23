import { HttpException } from '@nestjs/common';
import { BusinessError } from './constants';
import { ERROR_CODE } from '../error-codes';

/**
 * 自定义业务异常
 */
export class BusinessException extends HttpException {
  constructor(err?: BusinessError) {
    // 处理公共错误
    super(err, ERROR_CODE.COMMON.code);
  }

  /**
   * 抛出公共异常
   */
  static throwCommonError() {
    throw new BusinessException(ERROR_CODE.COMMON);
  }

  /**
   * 角色无操作权限
   */
  static throwNoPermissionToOperate() {
    throw new BusinessException(ERROR_CODE.NO_PERMISSION_TO_OPERATE);
  }

  /**
   * 无效token或已过期
   */
  static throwInvalidToken() {
    throw new BusinessException(ERROR_CODE.INVALID_TOKEN);
  }

  /**
   * 用户不存在
   */
  static throwUserNotExist() {
    throw new BusinessException(ERROR_CODE.USER_DOES_NOT_EXIST);
  }

  /**
   * 账号或密码错误
   */
  static throwUsernameOrPasswordIncorrect(): void {
    throw new BusinessException(ERROR_CODE.USERNAME_OR_PASSWORD_INCORRECT);
  }

  /**
   * 修改密码时旧的密码验证错误
   */
  static throwOldPasswordIncorrect() {
    throw new BusinessException(ERROR_CODE.OLD_PASSWORD_INCORRECT);
  }

  /**
   * 角色名重复
   */
  static throwRoleNameExist() {
    throw new BusinessException(ERROR_CODE.ROLE_NAME_EXIST);
  }

  // 演示环境禁止操作
  static throwDemoEnvForbidden() {
    throw new BusinessException(ERROR_CODE.DEMO_ENV_FORBIDDEN);
  }

  // 角色已被使用
  static throwRoleInUse() {
    throw new BusinessException(ERROR_CODE.ROLE_IN_USE);
  }

  // 角色不存在
  static throwRoleNotExist() {
    throw new BusinessException(ERROR_CODE.ROLE_NOT_EXIST);
  }
}
