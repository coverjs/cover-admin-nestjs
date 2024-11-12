import { PartialType } from '@nestjs/swagger';
import { CreateMenuDto } from './menu.dto';

export class UpdateMenuDto extends PartialType(CreateMenuDto) {}
