import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiOperationOptions } from '@nestjs/swagger';
import { LogicalEnum, PermissionsAuth } from './permissions-auth.decorator';

export type CommonApiOperationOptions = ApiOperationOptions & {
  permissionAuth?: {
    permissions?: string | string[];
    logical?: LogicalEnum;
  };
};

export const CommonApiOperation = (options: CommonApiOperationOptions) => {
  const { permissionAuth, ...apiOperationOptions } = options;

  const decorators = [
    ...(apiOperationOptions ? [ApiOperation(apiOperationOptions)] : []),
    ...(permissionAuth ? [PermissionsAuth(permissionAuth.permissions, permissionAuth.logical)] : [])
  ];

  return applyDecorators(...decorators);
};
