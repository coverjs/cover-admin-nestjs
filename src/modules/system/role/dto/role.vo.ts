import { ApiProperty } from '@nestjs/swagger';

export class RoleVo {
  @ApiProperty({ description: '角色id', example: 1 })
  id: number;

  @ApiProperty({ description: '角色名称', example: 'admin' })
  name: string;

  @ApiProperty({ description: '角色描述', example: '管理员' })
  description: string;

  @ApiProperty({ description: '创建时间' })
  createdAt: string;

  @ApiProperty({ description: '更新日期' })
  updatedAt: string;
}
