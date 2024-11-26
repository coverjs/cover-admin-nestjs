import type { Type } from '@nestjs/common';
import type { ApiResponseOptions } from '@nestjs/swagger';
import type { ReferenceObject, SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import type { UnityResponseOptions } from '../types';
import { applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { CommonResponseVo } from '../dto';

type Model = SchemaObject | ReferenceObject;

// 处理数据类型模型
function handleModel(options: UnityResponseOptions & { example?: any, itemType?: Type<any> }): SchemaObject | ReferenceObject {
  const { type, itemType, description, example } = options;
  if (!type) {
    return {};
  }

  if (typeof type === 'string') {
    switch (type) {
      case 'list':
        return {
          properties: {
            data: {
              description,
              required: ['list', 'total'],
              properties: {
                list: {
                  type: 'array',
                  items: { $ref: getSchemaPath(itemType) }
                },
                total: { type: 'number', default: 0 }
              }
            }
          }
        } as Model;
      case 'array':
        return {
          properties: {
            data: {
              description,
              type: 'array',
              example,
              items: { $ref: getSchemaPath(itemType) }
            }
          }
        } as Model;
      default:
        return {
          properties: {
            data: {
              description,
              example,
              type
            }
          }
        } as Model;
    }
  }

  return {
    properties: {
      data: {
        description,
        allOf: [{ $ref: getSchemaPath(type) }]
      }
    }
  } as Model;
}

// 封装 swagger-ui 响应信息处理函数
function handleSwaggerResponse(options: UnityResponseOptions & { example?: any, itemType?: Type<any> }): ApiResponseOptions {
  const { status, title } = options;
  return {
    status,
    schema: {
      title: title || '响应示例：',
      allOf: [{ $ref: getSchemaPath(CommonResponseVo) }, handleModel(options)]
    }
  };
}

// 自定义 swagger 统一响应数据模型
export function CommonApiResponse(options: UnityResponseOptions & { example?: any, itemType?: Type<any>, isPublic?: boolean } = {}) {
  let decorators = [ApiResponse(handleSwaggerResponse(options))];
  if (options.type && typeof options.type !== 'string') {
    decorators = [...decorators, ApiExtraModels(options.type)];
  }
  if (options.itemType && typeof options.itemType !== 'string') {
    decorators = [...decorators, ApiExtraModels(options.itemType)];
  }
  return applyDecorators(...decorators);
}
