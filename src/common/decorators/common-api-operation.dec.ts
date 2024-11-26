import type { ApiOperationOptions } from '@nestjs/swagger';
import { applyDecorators, HttpCode } from '@nestjs/common';
import { ApiHeader, ApiOperation } from '@nestjs/swagger';
import { LogicalEnum, PermissionsAuth } from './permissions-auth.decorator';
import { IsPublic } from './public';

export type CommonApiOperationOptions = ApiOperationOptions & {
  permissionCode?: string | string[]
  permissionLogical?: LogicalEnum
  // 是否公开接口，公开接口不校验权限
  isPublic?: boolean
};

// 通用 Api 操作装饰器
export function CommonApiOperation(options: CommonApiOperationOptions) {
  const { isPublic = false } = options;

  const { permissionCode, permissionLogical = LogicalEnum.or, ...apiOperationOptions } = options;

  const handlePermissionCode = (permissionCode: string | string[]) => {
    if (Array.isArray(permissionCode)) {
      const codes = permissionCode.map(code => {
        return `${code}`;
      });
      return codes.join(permissionLogical === LogicalEnum.or ? ' 或者 ' : ' 并且 ');
    }
    return `${permissionCode}`;
  };

  if (!apiOperationOptions.description)
    apiOperationOptions.description = '';
  else apiOperationOptions.description += '\n\n';

  if (permissionCode) {
    apiOperationOptions.description += `[ 权限码：${handlePermissionCode(permissionCode)} ]`;
  }
  const decorators = [
    IsPublic(isPublic),
    HttpCode(200),
    ApiHeader({ name: 'lang', description: '业务异常反馈所使用的语言', enum: ['zh-CN', 'en-US'], example: 'zh-CN' }),
    PermissionsAuth(permissionCode, permissionLogical),
    ...(apiOperationOptions ? [ApiOperation(apiOperationOptions)] : [])
  ];

  return applyDecorators(...decorators);
}
