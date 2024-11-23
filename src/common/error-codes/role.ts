// 角色相关错误码为: 42xx
export const ROLE_ERROR_CODE = {
  // 该角色不存在
  ROLE_NOT_EXIST: {
    code: 4200,
    msg: {
      'zh-CN': '该角色不存在',
      'en-US': 'The role does not exist'
    }
  },

  ROLE_NAME_EXIST: {
    code: 4201,
    msg: {
      'zh-CN': '角色名称已存在',
      'en-US': 'Role name already exists'
    }
  },

  // 该角色已被使用
  ROLE_IN_USE: {
    code: 4202,
    msg: {
      'zh-CN': '该角色已被使用',
      'en-US': 'The role has been used'
    }
  },

  /**
   * 角色无操作权限
   */
  NO_PERMISSION_TO_OPERATE: {
    code: 4203,
    msg: {
      'zh-CN': '无权操作, 请联系管理员',
      'en-US': 'No permission to operate, please contact the administrator'
    }
  }
};
