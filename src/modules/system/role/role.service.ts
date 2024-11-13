import { Injectable } from '@nestjs/common';
import { CreateRoleDto, RoleListDto } from './dto/role.dto';
import { PrismaService } from '@/common/prisma/prisma.service';
import { BusinessException } from '@/common/exceptions';

@Injectable()
export class RoleService {
  constructor(private prismaService: PrismaService) {}
  async create(createRoleDto: CreateRoleDto) {
    const { name } = createRoleDto;
    const { menuIds, ...params } = createRoleDto;
    const role = await this.prismaService.role.findUnique({
      where: { name }
    });

    if (role) BusinessException.throwRoleNameExist();

    await this.prismaService.role.create({
      data: {
        ...params,
        menus: { connect: menuIds.map((id) => ({ id })) }
      }
    });
  }

  async findList(queryRoleList: RoleListDto) {
    const { skip, take, name } = queryRoleList;
    const list = await this.prismaService.role.findMany({
      where: { name: { contains: name } },
      skip,
      take
    });

    return { list, total: list.length };
  }
}
