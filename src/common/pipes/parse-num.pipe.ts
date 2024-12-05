import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { isEmpty } from 'class-validator';
import { BusinessException } from '../exceptions';

export function ParseNumPipe(options?: { optional: boolean }) {
  const { optional = true } = options || {};

  @Injectable()
  class ParseNumMixinPipe implements PipeTransform<string, number> {
    transform(value: string, metadata: ArgumentMetadata): number {
      if (optional && isEmpty(value)) {
        return void 0;
      }
      const val = Number.parseInt(value, 10);
      if (Number.isNaN(val)) {
        BusinessException.throwFieldTypeError(metadata);
      }
      return val;
    }
  }

  return ParseNumMixinPipe;
}
