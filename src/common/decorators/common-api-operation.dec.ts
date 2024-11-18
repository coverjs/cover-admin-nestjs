import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiOperationOptions } from '@nestjs/swagger';
import { LogicalEnum, PermissionsAuth } from './permissions-auth.decorator';

export type CommonApiOperationOptions = ApiOperationOptions & {
  permissionCode?: string | string[];
  permissionLogical?: LogicalEnum;
};

export const CommonApiOperation = (options: CommonApiOperationOptions) => {
  const { permissionCode, permissionLogical = LogicalEnum.or, ...apiOperationOptions } = options;

  const handlePermissionCode = (permissionCode: string | string[]) => {
    if (Array.isArray(permissionCode)) {
      const codes = permissionCode.map((code) => {
        return `${code}`;
      });
      return codes.join(permissionLogical === LogicalEnum.or ? ` 或者 ` : ` 并且 `);
    }
    return `${permissionCode}`;
  };

  if (!apiOperationOptions.description) apiOperationOptions.description = '';
  else apiOperationOptions.description += '\n\n';

  if (permissionCode) {
    apiOperationOptions.description += `[ 权限码：${handlePermissionCode(permissionCode)} ]`;
  }
  const decorators = [
    ...(apiOperationOptions ? [ApiOperation(apiOperationOptions)] : []),
    PermissionsAuth(permissionCode, permissionLogical)
  ];

  return applyDecorators(...decorators);
};
