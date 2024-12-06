import { PaginationDto } from '@/common/dto';
import { AccountLoginDto } from '@/modules/auth/dto/auth.dto';
import { ParseBoolean, ParseInt, vali } from '@/utils/common';
import { ApiProperty, IntersectionType, OmitType, PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsDefined, IsEmail, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsDefined(vali('validation.not_empty'))
  @ApiProperty({ description: '昵称', maxLength: 6, minLength: 2 })
  nickname: string;

  @ApiProperty({ description: '邮箱', required: false })
  @IsEmail({}, vali('validation.invalid_email'))
  @IsOptional()
  email?: string;

  @Transform(ParseInt)
  @IsDefined(vali('validation.not_defined'))
  @ApiProperty({ description: '角色id' })
  roleId: number;

  @Transform(ParseBoolean)
  @IsBoolean(vali('validation.invalid_boolean'))
  @ApiProperty({ description: '是否启用' })
  enable: boolean;
}

export class CreateUserDto extends IntersectionType(AccountLoginDto, UpdateUserDto) {}

// 排除password
export class UserDto extends OmitType(CreateUserDto, ['password'] as const) {}

// 全部转为可选的参数
export class UserOptionalDto extends PartialType(UserDto) {}

// 合并分页查询参数
export class UserListDto extends PaginationDto {
  @ApiProperty({ description: '用户名称', required: false })
  username?: string;

  @ApiProperty({ description: '昵称', required: false })
  nickname?: string;

  @ApiProperty({ description: '邮箱', required: false })
  email?: string;

  @Transform(ParseInt)
  @ApiProperty({ description: '角色id', required: false })
  roleId?: number;

  @Transform(ParseBoolean)
  @ApiProperty({ description: '是否启用', required: false })
  enable?: boolean;
}
