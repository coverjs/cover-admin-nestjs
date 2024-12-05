import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AccountLoginDto {
  @IsNotEmpty({ message: 'error.user.username_cannot_be_empty' })
  @ApiProperty({ description: '账号', example: 'admin' })
  username: string;

  @IsNotEmpty({ message: 'error.user.password_cannot_be_empty' })
  @ApiProperty({ description: '密码', example: 'admin' })
  password: string;
}
