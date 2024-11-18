import { ApiProperty } from '@nestjs/swagger';
import { NodeType } from '@prisma/client';

export class CreateMenuDto {
  @ApiProperty({ description: '名称', required: true, example: '首页' })
  name: string;

  @ApiProperty({ description: '国际化', required: false })
  locale: string;

  @ApiProperty({ description: '图标', required: false, example: 'FileOutlined' })
  icon?: string;

  @ApiProperty({ description: '权限码', required: true, example: 'home' })
  code: string;

  @ApiProperty({ description: '父级菜单id', required: false, example: 1 })
  parentId?: number;

  @ApiProperty({ description: '排序', required: true, example: 1 })
  sort: number;

  @ApiProperty({ description: '页面路径', required: false, example: '/home' })
  path?: string;

  @ApiProperty({
    description: '节点类型, "DIRECTORY": 目录; "MENU": 菜单; "ACTION": 操作',
    enum: ['DIRECTORY', 'MENU', 'ACTION'],
    default: 'DIRECTORY',
    example: 'DIRECTORY'
  })
  type: NodeType;
}
