import { PaginationDto } from '@/common/dto';
import { AccountLoginDto } from '@/modules/auth/dto/auth.dto';
import { ParseBoolean, ParseInt, vali } from '@/utils/common';
import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsDefined, IsEmail } from 'class-validator';

export class CreateUserDto extends AccountLoginDto {
  @ApiProperty({ description: '昵称', maxLength: 6, minLength: 2 })
  nickname?: string;

  @ApiProperty({ description: '邮箱', required: false })
  @IsEmail({}, vali('validation.invalid_email'))
  email?: string;

  @Transform(ParseInt)
  @IsDefined(vali('validation.not_defined'))
  @ApiProperty({ description: '角色id' })
  roleId: number;

  @Transform(ParseBoolean)
  @IsBoolean(vali('validation.invalid_boolean'))
  @ApiProperty({ description: '是否启用' })
  enable?: boolean;
}
// 排除password
export class UserDto extends OmitType(CreateUserDto, ['password'] as const) {}

// 全部转为可选的参数
export class UserOptionalDto extends PartialType(UserDto) {}

// 合并分页查询参数
export class UserListDto extends PaginationDto {
  @ApiProperty({ description: '用户名称' })
  username?: string;

  @ApiProperty({ description: '昵称' })
  nickname?: string;

  @ApiProperty({ description: '邮箱' })
  email?: string;

  @Transform(ParseInt)
  @ApiProperty({ description: '角色id' })
  roleId?: number;

  @Transform(ParseBoolean)
  @ApiProperty({ description: '是否启用' })
  enable?: boolean;
}
