import { HttpException, HttpStatus } from '@nestjs/common';
import { Path } from 'nestjs-i18n';
import { I18nTranslations } from '../types/i18n';

interface ExceptionOptions {
  code?: number
  msg: Path<I18nTranslations>
}

/**
 * 自定义业务异常
 */
export class Exception extends HttpException {
  constructor(options: ExceptionOptions) {
    // 处理公共错误
    super(options, HttpStatus.BAD_REQUEST);
  }

  /**
   * 抛出异常
   */
  static throwError(msg: Path<I18nTranslations>) {
    throw new Exception({ msg, code: HttpStatus.BAD_REQUEST });
  }

  /**
   * 角色无操作权限
   */
  static throwNoPermissionToOperate() {
    throw new Exception({
      code: HttpStatus.FORBIDDEN,
      msg: 'exception.auth.no_operational_permissions'
    });
  }

  /**
   * 无效token或已过期
   */
  static throwInvalidToken() {
    throw new Exception({
      code: HttpStatus.UNAUTHORIZED,
      msg: 'exception.auth.invalid_token'
    });
  }
}
