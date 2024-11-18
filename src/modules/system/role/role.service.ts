import { Injectable } from '@nestjs/common';
import { CreateRoleDto, RoleListDto } from './dto/role.dto';
import { PrismaService } from '@/common/prisma/prisma.service';
import { BusinessException } from '@/common/exceptions';
import { RedisService } from '@/common/redis/redis.service';

@Injectable()
export class RoleService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly redisService: RedisService
  ) {}

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

    return list;
  }

  /* 让该角色下的所有用户的的缓存版本号增加 ， 让他们重新登录 */
  async updateUserVersionByRoleId(roleId: number) {
    const users = await this.prismaService.user.findMany({
      where: {
        role: {
          id: roleId
        }
      }
    });

    const promiseArr = users.map((user) => {
      return this.redisService.addUserVersion(user.id);
    });
    await Promise.all(promiseArr);
  }
}
