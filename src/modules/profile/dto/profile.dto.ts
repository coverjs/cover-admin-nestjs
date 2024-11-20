import { UserOptionalDto } from '@/modules/system/user/dto/user.dto';
import { ApiProperty, OmitType } from '@nestjs/swagger';

// 更新个人信息
export class UpdateProfileDto extends OmitType(UserOptionalDto, ['roleId', 'enable', 'username'] as const) {}

// 修改密码
export class UpdatePasswordDto {
  @ApiProperty({ description: '旧密码' })
  oldPassword: string;

  @ApiProperty({ description: '新密码' })
  newPassword: string;
}
