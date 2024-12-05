import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { isBooleanString, isEmpty } from 'class-validator';
import { BusinessException } from '../exceptions';

export function ParseBoolPipe(options?: { optional?: boolean, defaultValue?: boolean }) {
  const { optional = true, defaultValue } = options || {};

  @Injectable()
  class ParseBoolMixinPipe implements PipeTransform<string, boolean> {
    transform(value: string, metadata: ArgumentMetadata): boolean {
      let val = defaultValue;
      if (optional && isEmpty(value)) {
        return defaultValue;
      }
      if (isBooleanString(value)) {
        switch (value) {
          case 'true':
            val = true;
            break;
          case 'false':
            val = false;
            break;
        }
      }
      else {
        BusinessException.throwFieldTypeError(metadata);
      }
      return val;
    }
  }

  return ParseBoolMixinPipe;
}
