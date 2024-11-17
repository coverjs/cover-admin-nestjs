import { NodeType } from '@prisma/client';
import { encryptPassword } from './cryptogram';

export const User = [
  {
    username: 'admin',
    password: encryptPassword('admin', '1118'),
    salt: '1118',
    nickname: 'hacxy',
    email: 'admin@admin.com',
    roleId: 1
  }
];

export const Role = [
  {
    id: 1,
    name: 'admin',
    description: '管理员'
  }
];

export const Menu = [
  {
    id: 1,
    name: '系统管理',
    code: 'system',
    type: NodeType.DIRECTORY,
    sort: 1,
    path: '/system'
  },
  {
    id: 2,
    name: '用户管理',
    code: 'system:user',
    type: NodeType.MENU,
    sort: 1,
    path: '/system/user',
    parentId: 1
  },
  {
    id: 3,
    name: '创建用户',
    code: 'system:user:add',
    type: NodeType.ACTION,
    sort: 1,
    parentId: 2
  },
  {
    id: 4,
    name: '用户列表',
    code: 'system:user:list',
    type: NodeType.ACTION,
    sort: 1,
    parentId: 2
  },
  {
    id: 5,
    name: '角色管理',
    code: 'system:role',
    type: NodeType.MENU,
    sort: 1,
    parentId: 1
  },
  {
    id: 6,
    name: '创建角色',
    code: 'system:role:add',
    type: NodeType.ACTION,
    sort: 1,
    parentId: 5
  },
  {
    id: 7,
    name: '角色列表',
    code: 'system:role:list',
    type: NodeType.ACTION,
    sort: 1,
    parentId: 5
  },
  {
    id: 8,
    name: '菜单管理',
    code: 'system:menu',
    type: NodeType.MENU,
    sort: 1,
    parentId: 1
  },
  {
    id: 9,
    name: '创建菜单',
    code: 'system:menu:add',
    type: NodeType.ACTION,
    sort: 1,
    parentId: 8
  },
  {
    id: 10,
    name: '菜单列表',
    code: 'system:menu:list',
    type: NodeType.ACTION,
    sort: 1,
    parentId: 8
  }
];
