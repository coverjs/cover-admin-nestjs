import { PaginationDto } from '@/common/dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({ description: '角色名' })
  name: string;

  @ApiProperty({ description: '角色描述' })
  description: string;

  @ApiProperty({ description: '为该角色赋予权限的菜单id列表', type: [Number] })
  menuIds: number[];
}

export class RoleListDto extends PaginationDto {
  @ApiProperty({ description: '角色名', required: false })
  name?: string;
}
