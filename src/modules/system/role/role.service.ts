import { BusinessException } from '@/common/exceptions';
import { PrismaService } from '@/common/prisma/prisma.service';
import { RedisService } from '@/common/redis/redis.service';
import { findListData } from '@/utils/common';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateRoleDto, RoleListDto, UpdateRoleDto } from './dto/role.dto';

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

    if (role) {
      BusinessException.throwError('exception.role.role_name_exist');
    }

    await this.prismaService.role.create({
      data: {
        ...params,
        menus: { connect: menuIds.map(id => ({ id })) }
      }
    });
  }

  async findList(queryRoleList: RoleListDto) {
    const { skip, take, name } = queryRoleList;
    return await findListData<Prisma.RoleFindManyArgs>(this.prismaService.role, {
      where: { name: { contains: name } },
      skip,
      take
    });
  }

  // 删除角色
  async removeById(id: number) {
    const role = await this.prismaService.role.findUnique({
      where: { id }
    });

    if (!role) {
      BusinessException.throwError('exception.role.role_not_exist');
    }

    // 判断当前角色是否有用户使用
    const user = await this.prismaService.user.findFirst({
      where: {
        role: {
          id
        }
      }
    });

    if (user) {
      BusinessException.throwError('exception.role.role_in_use');
    }

    await this.prismaService.role.delete({
      where: { id }
    });
  }

  // 根据id修改角色
  async updateById(id: number, updateRoleDto: UpdateRoleDto) {
    const { name } = updateRoleDto;
    const { menuIds, ...params } = updateRoleDto;

    const role = await this.prismaService.role.findUnique({ where: { id } });
    if (!role) {
      BusinessException.throwError('exception.role.role_not_exist');
    }

    if (role.name !== name) {
      const oldRole = await this.prismaService.role.findUnique({
        where: { name }
      });

      if (oldRole)
        BusinessException.throwError('exception.role.role_name_exist');
    }

    await this.prismaService.role.update({
      where: { id },
      data: {
        ...params,
        menus: { set: menuIds.map(id => ({ id })) }
      }
    });

    // 更新用户的缓存版本号
    await this.updateUserVersionByRoleId(id);
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

    const promiseArr = users.map(user => {
      return this.redisService.addUserVersion(user.id);
    });
    await Promise.all(promiseArr);
  }
}
