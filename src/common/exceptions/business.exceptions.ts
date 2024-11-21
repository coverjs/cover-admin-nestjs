import { HttpException } from '@nestjs/common';
import { BusinessError } from './constants';
import { BUSINESS_ERROR_CODE } from './business.error.code';
import { ERROR_CODE } from '../error-codes';

/**
 * 自定义业务异常
 */
export class BusinessException extends HttpException {
  constructor(err?: BusinessError) {
    // 处理公共错误
    super(err, BUSINESS_ERROR_CODE.COMMON.code);
  }

  /**
   * 抛出公共异常
   */
  static throwCommonError() {
    throw new BusinessException(BUSINESS_ERROR_CODE.COMMON);
  }

  /**
   * 角色无操作权限
   */
  static throwNoPermissionToOperate() {
    // throw new BusinessException(BUSINESS_ERROR_CODE.NO_PERMISSION_TO_OPERATE);
  }

  /**
   * 字段不合法
   * @param msg
   */
  static throwFieldsIncorrect() {
    throw new BusinessException(BUSINESS_ERROR_CODE.FIELD_INCORRECT);
  }

  /**
   * 无效token或已过期
   */
  static throwInvalidToken() {
    throw new BusinessException(BUSINESS_ERROR_CODE.INVALID_TOKEN);
  }

  /**
   * 用户不存在
   */
  static throwUserNotExist() {
    throw new BusinessException(BUSINESS_ERROR_CODE.USER_DOES_NOT_EXIST);
  }

  /**
   * 账号或密码错误
   */
  static throwUsernameOrPasswordIncorrect(): void {
    throw new BusinessException(BUSINESS_ERROR_CODE.USERNAME_OR_PASSWORD_INCORRECT);
  }

  /**
   * 修改密码时旧的密码验证错误
   */
  static throwOldPasswordIncorrect() {
    throw new BusinessException(BUSINESS_ERROR_CODE.OLD_PASSWORD_INCORRECT);
  }

  /**
   * 角色名重复
   */
  static throwRoleNameExist() {
    throw new BusinessException(BUSINESS_ERROR_CODE.ROLE_NAME_EXIST);
  }
  /**
   * 数据已被保护
   */
  static throwDataProtected() {
    throw new BusinessException(BUSINESS_ERROR_CODE.DATA_PROTECTED);
  }

  // 演示环境禁止操作
  static throwDemoEnvForbidden() {
    throw new BusinessException(ERROR_CODE.DEMO_ENV_FORBIDDEN);
  }
}
