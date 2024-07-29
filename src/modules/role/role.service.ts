import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/role.dto';
import { QueryRoleDto } from './dto/role.query.dto';
import { SetPermissionsDto } from './dto/role.permisssions.dto';
import { PrismaService } from '@/common/prisma/prisma.service';
import { BusinessException } from '../../common/exceptions/business.exceptions';

@Injectable()
export class RoleService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createRoleDto: CreateRoleDto) {
    const { name } = createRoleDto;
    const user = await this.prismaService.role.findUnique({
      where: {
        name
      }
    });
    user && BusinessException.throwCommonIncorrect('角色名称已存在');
    await this.prismaService.role.create({
      data: createRoleDto
    })
    return null;
  }

  async findAll(query: QueryRoleDto) {
    // 基于偏移分页
    const { pageNum, pageSize } = query;
    const skip = (pageNum - 1) * pageSize;
    const take = pageSize;
    const results = await this.prismaService.role.findMany({
      skip,
      take,
      orderBy: {
        createdAt: 'asc'
      }
    });
    return results;
  }

  async findOne(id: number) {
    !id && BusinessException.throwCommonIncorrect('角色ID不能为空');
    const user = await this.prismaService.role.findUnique({
      where: {
        id
      }
    });
    return user
  }

  async remove(id: number) {
    !id && BusinessException.throwCommonIncorrect('角色ID不能为空');
    await this.prismaService.role.delete({
      where: {
        id
      }
    });
    return null
  }
  async setPermissions(setPermissionsDto: SetPermissionsDto) {
    const { roleId, permissionIds } = setPermissionsDto
    !roleId && BusinessException.throwCommonIncorrect('角色id不能为空');
    const role = await this.prismaService.role.findUnique({
      where: {
        id: roleId,
      }
    })
    !role && BusinessException.throwCommonIncorrect('角色不存在');
    const permissions = await this.prismaService.permission.findMany({
      where: {
        id: {in:(permissionIds)},
      },
    })
    console.log(permissions, 'permissions')
    // await this.prismaService.role.update({
    //   where: { id: roleId },
    //   data: {
    //     permissions: permissions,
    //   },
    // })


    return null
  }
}
