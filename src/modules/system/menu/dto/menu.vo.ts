import { ApiProperty } from '@nestjs/swagger';
import { NodeType } from '@prisma/client';

export class MenuVo {
  @ApiProperty({ description: 'id', example: 1 })
  id: number;

  @ApiProperty({ description: '名称', example: '首页' })
  name: string;

  @ApiProperty({ description: '英文名称', required: false, example: 'home' })
  enName: string;

  @ApiProperty({ description: '图标', required: false, example: 'FileOutlined' })
  icon?: string;

  @ApiProperty({ description: '权限编码' })
  code: string;

  @ApiProperty({ description: '父级id', example: 1, required: false })
  parentId?: number;

  @ApiProperty({ description: '子菜单', type: MenuVo, isArray: true, required: false })
  children?: MenuVo[];

  @ApiProperty({ description: '排序', example: 1 })
  sort: number;

  @ApiProperty({ description: '页面路径' })
  path: string;

  @ApiProperty({ description: '节点类型', enum: NodeType })
  type: NodeType;

  @ApiProperty({ description: '创建时间' })
  createdAt: string;

  @ApiProperty({ description: '更新时间' })
  updatedAt: string;
}
