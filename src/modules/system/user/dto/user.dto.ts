import { PaginationDto } from '@/common/dto';
import { ApiProperty, IntersectionType, OmitType, PartialType } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: '用户账号' })
  username: string;

  @ApiProperty({ description: '密码' })
  password: string;

  @ApiProperty({ description: '昵称' })
  nickname: string;

  @ApiProperty({ description: '邮箱' })
  email?: string;

  @ApiProperty({ description: '角色id' })
  roleId: number;

  @ApiProperty({ description: '是否启用' })
  enable?: boolean;
}
// 排除password
export class UserDto extends OmitType(CreateUserDto, ['password'] as const) {}
// 可选的参数
export class UserOptionalDto extends PartialType(UserDto) {}
// 合并分页查询参数
export class UserListDto extends IntersectionType(PaginationDto, UserOptionalDto) {}
