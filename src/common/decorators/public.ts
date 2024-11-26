import { applyDecorators, SetMetadata } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { IS_PUBLIC_KEY } from '../constants';

const SetPublic = (value: boolean) => SetMetadata(IS_PUBLIC_KEY, value);

export function IsPublic(value: boolean = true) {
  const decorators = [SetPublic(value)];
  if (value) {
    return applyDecorators(...decorators);
  }
  else {
    return applyDecorators(...decorators, ApiBearerAuth());
  }
}
