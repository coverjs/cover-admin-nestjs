import { UserOptionalDto } from '@/modules/system/user/dto/user.dto';
import { OmitType } from '@nestjs/swagger';

// 更新个人信息
export class UpdateProfileDto extends OmitType(UserOptionalDto, ['roleId', 'enable'] as const) {}

// 修改密码
export interface UpdatePasswordDto {
  oldPassword: string;
  newPassword: string;
}
