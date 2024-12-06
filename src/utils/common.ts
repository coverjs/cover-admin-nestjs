import process from 'node:process';
import { BusinessException } from '@/common/exceptions';
import { I18nTranslations } from '@/common/types/i18n';
import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';
import { TransformFnParams } from 'class-transformer';
import { isBoolean, isBooleanString, isEmpty, isNumber, isNumberString, ValidationArguments, ValidationOptions } from 'class-validator';
import { Path } from 'nestjs-i18n';
import { handleTree } from './format';

export function isDev() {
  return process.env.NODE_ENV === 'development';
}

export function recursiveFilter(data: { [key: string]: any } | any[], keyToFilter: string[] = []): { [key: string]: any } | any[] {
  if (Array.isArray(data)) {
    return data.map(item => recursiveFilter(item, keyToFilter));
  }
  else if (typeof data === 'object' && data !== null && !(data instanceof Date)) {
    const result: { [key: string]: any } = {};
    for (const key in data) {
      if (!keyToFilter.includes(key)) {
        result[key] = recursiveFilter(data[key], keyToFilter);
      }
    }
    return result;
  }
  return data;
}

export async function findListData<T>(model, options: T & { tree?: boolean }, filterField?: string[]) {
  const where = (options as { [key: string]: any }).where;
  const { tree, ...resOpt } = options;
  let list = await model.findMany({
    ...resOpt
  });

  if (tree) {
    list = handleTree(list);
  }

  const total = await model.count({ where });
  return {
    list: list.map(item => recursiveFilter(item, filterField)),
    total
  };
}

export function ParseBoolean(params: TransformFnParams) {
  const { value, key: field } = params;
  if (isBoolean(value)) {
    return value;
  }
  if (isEmpty(value)) {
    return void 0;
  }
  else if (isBooleanString(value)) {
    if ([true, 'true', 1].includes(value)) {
      return true;
    }
    else if ([false, 'false', 0].includes(value)) {
      return false;
    }
  }
  else {
    BusinessException.throwError('validation.field', { args: {
      field,
      type: 'boolean'
    } });
  }
}

export function ParseInt(params: TransformFnParams) {
  const { value, key: field } = params;
  if (isEmpty(value)) {
    return void 0;
  }
  if (isNumber(value)) {
    return value;
  }
  else if (isNumberString(value)) {
    return +value;
  }
  else {
    BusinessException.throwError('validation.field', { args: {
      field,
      type: 'number'
    } });
  }
}

export function validMessage(msg: Path<I18nTranslations>, argument: ValidationArguments): string {
  BusinessException.throwError(msg, {
    args: argument
  });
  return void 0;
}
/**
 * 校验选项处理
 */
export function vali(msg?: Path<I18nTranslations>, options: ValidationOptions = {}) {
  if (msg) {
    options.message = arg => validMessage(msg, arg);
  }
  return options;
}

// export function IsMobile(validationOptions?: ValidationOptions) {
//   return function (object: object, propertyName: string) {
//     registerDecorator({
//       name: 'IsMobile',
//       target: object.constructor,
//       propertyName,
//       constraints: [],
//       options: validationOptions,
//       validator: {
//         validate: (value: any) => isMobileNumber(value),
//         defaultMessage: (validationArguments?: ValidationArguments) => {
//           return `${validationArguments.property}不是有效的手机号码`;
//         }
//       }
//     });
//   };
// }

export function Demo(options?: ApiPropertyOptions) {
  return applyDecorators(ApiProperty(options));
}
