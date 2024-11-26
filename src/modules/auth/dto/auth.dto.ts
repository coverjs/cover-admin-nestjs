import { ApiProperty } from '@nestjs/swagger';

export class AccountLoginDto {
  @ApiProperty({ description: '账号', example: 'admin' })
  username: string;

  @ApiProperty({ description: '密码', example: 'admin' })
  password: string;
}
