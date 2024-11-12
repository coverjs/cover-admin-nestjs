import { ApiProperty } from '@nestjs/swagger';
import { NodeType } from '@prisma/client';

export class CreateMenuDto {
  @ApiProperty({ description: '名称', required: true, example: '首页' })
  name: string;

  @ApiProperty({ description: '权限编码', required: true, example: 'home' })
  code: string;

  @ApiProperty({ description: '父级菜单id', required: false, example: 1 })
  parentId?: number;

  @ApiProperty({ description: '排序', required: true, example: 1 })
  sort: number;

  @ApiProperty({ description: '页面路径', required: false, example: '/home' })
  path?: string;

  @ApiProperty({
    description: '节点类型, "DIRECTORY": 目录; "MENU": 菜单; "BUTTON": 按钮',
    enum: ['DIRECTORY', 'MENU', 'BUTTON'],
    default: 'DIRECTORY',
    example: 'DIRECTORY'
  })
  type: NodeType;
}
