import { HttpException, HttpStatus } from '@nestjs/common';
import { Path, TranslateOptions } from 'nestjs-i18n';
import { I18nTranslations } from '../types/i18n';
import { BusinessError } from './constants';

/**
 * 自定义业务异常
 */
export class BusinessException extends HttpException {
  constructor(err?: BusinessError) {
    // 处理公共错误
    super(err, HttpStatus.INTERNAL_SERVER_ERROR);
  }

  /**
   * 抛出客户端异常
   */
  static throwError(msg: Path<I18nTranslations>, options?: TranslateOptions & { code?: number }) {
    throw new BusinessException({
      msg,
      code: options.code && HttpStatus.BAD_REQUEST,
      options
    });
  }

  /**
   * 角色无操作权限
   */
  static throwNoPermissionToOperate() {
    throw new BusinessException({
      code: HttpStatus.FORBIDDEN,
      msg: 'exception.auth.no_operational_permissions'
    });
  }

  /**
   * 无效token或已过期
   */
  static throwInvalidToken() {
    throw new BusinessException({
      code: HttpStatus.UNAUTHORIZED,
      msg: 'exception.auth.invalid_token'
    });
  }

  static throwRolePermisstionsUpdate() {
    throw new BusinessException({
      code: HttpStatus.GONE,
      msg: 'exception.role.role_permisstions_update'
    });
  }

  static throwLoginOtherDevice() {
    return new BusinessException({ msg: 'exception.user.login_other_device', code: HttpStatus.CONFLICT });
  }
}
