export const BUSINESS_ERROR_CODE = {
  /**
   * 公共错误码
   */
  COMMON: {
    code: 5000,
    msg: {
      'zh-CN': '非正常请求',
      'en-US': 'Non-normal request'
    }
  },

  /**
   * 无效或过期token
   */
  INVALID_TOKEN: {
    code: 401,
    msg: {
      'zh-CN': '无效或过期token',
      'en-US': 'Invalid or expired token'
    }
  },

  /**
   * 角色无操作权限
   */
  NO_PERMISSION_TO_OPERATE: {
    code: 406,
    msg: {
      'zh-CN': '无权操作, 请联系管理员',
      'en-US': 'No permission to operate, please contact the administrator'
    }
  },

  /**
   * 字段错误
   */
  FIELD_INCORRECT: {
    code: 1001,
    msg: {
      'zh-CN': '字段错误',
      'en-US': 'Field error'
    }
  },

  /**
   * 数据已被保护
   */
  DATA_PROTECTED: {
    code: 1005,
    msg: {
      'zh-CN': '数据已被保护',
      'en-US': 'Data is protected'
    }
  },

  USER_DOES_NOT_EXIST: {
    code: 2000,
    msg: {
      'zh-CN': '用户不存在',
      'en-US': 'User does not exist'
    }
  },

  USERNAME_OR_PASSWORD_INCORRECT: {
    code: 1000,
    msg: {
      'zh-CN': '用户名或密码不正确',
      'en-US': 'Username or password is incorrect'
    }
  },

  // 修改密码验证旧密码不正确
  OLD_PASSWORD_INCORRECT: {
    code: 1002,
    msg: {
      'zh-CN': '旧密码不正确',
      'en-US': 'Old password is incorrect'
    }
  },

  ROLE_NAME_EXIST: {
    code: 1002,
    msg: {
      'zh-CN': '角色名称已存在',
      'en-US': 'Role name already exists'
    }
  },

  ROLE_NAME_NOT_EXIST: {
    code: 1003,
    msg: {
      'zh-CN': '角色名称不存在',
      'en-US': 'Role name does not exist'
    }
  }
};
