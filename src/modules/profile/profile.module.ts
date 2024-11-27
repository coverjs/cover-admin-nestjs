import { Module } from '@nestjs/common';
import { MenuService } from '../system/menu/menu.service';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

@Module({
  controllers: [ProfileController],
  providers: [ProfileService, MenuService]
})
export class ProfileModule {}
