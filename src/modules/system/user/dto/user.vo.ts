import { RoleVo } from '@/modules/system/role/dto/role.vo';
import { ApiProperty } from '@nestjs/swagger';

export class UserInfoVo {
  @ApiProperty({ description: '账号' })
  username: string;

  @ApiProperty({ description: '昵称' })
  nickname: string;

  @ApiProperty({ description: '邮箱' })
  email: string;

  @ApiProperty({ description: '角色' })
  role: RoleVo;

  @ApiProperty({ description: '是否启用' })
  enable: boolean;

  @ApiProperty({ description: '创建时间' })
  createdAt: string;

  @ApiProperty({ description: '更新日期' })
  updatedAt: string;
}
