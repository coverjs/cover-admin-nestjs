import { Module } from '@nestjs/common';
import { RoleService } from '../role/role.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, RoleService]
})
export class UserModule {}
