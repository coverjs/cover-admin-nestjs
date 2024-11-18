import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { MenuService } from '../system/menu/menu.service';

@Module({
  controllers: [ProfileController],
  providers: [ProfileService, MenuService]
})
export class ProfileModule {}
