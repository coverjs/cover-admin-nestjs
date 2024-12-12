import { vali } from '@/utils/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, Matches } from 'class-validator';

export class AccountLoginDto {
  @IsDefined(vali('validation.not_defined'))
  @Matches(/^\w{5,12}$/, vali('exception.user.username_is_invalid'))
  @ApiProperty({ description: '账号', pattern: /^\w{5,12}$/.source })
  username: string;

  @IsDefined(vali('validation.not_defined'))
  @ApiProperty({ description: '密码' })
  password: string;
}
