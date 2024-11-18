export const BUSINESS_ERROR_CODE = {
  /**
   * 公共错误码
   */
  COMMON: {
    code: 5000,
    msg: '非正常请求'
  },

  /**
   * 无效或过期token
   */
  INVALID_TOKEN: {
    code: 401,
    msg: '无效身份或身份已过期'
  },

  /**
   * 角色无操作权限
   */
  NO_PERMISSION_TO_OPERATE: {
    code: 406,
    msg: '无权操作, 请联系管理员'
  },

  /**
   * 字段错误
   */
  FIELD_INCORRECT: {
    code: 1001,
    msg: '字段不合法'
  },

  /**
   * 数据已被保护
   */
  DATA_PROTECTED: {
    code: 1005,
    msg: '该数据已被保护'
  },

  USER_DOES_NOT_EXIST: {
    code: 2000,
    msg: '用户不存在'
  },

  USERNAME_OR_PASSWORD_INCORRECT: {
    code: 1000,
    msg: '用户名或密码不正确'
  },

  COMMON_BUSINESS_ERROR: {
    code: 500,
    msg: '系统错误'
  },

  ROLE_NAME_EXIST: {
    code: 1002,
    msg: '角色名称已存在'
  },

  ROLE_NAME_NOT_EXIST: {
    code: 1003,
    msg: '角色名称不能为空'
  }
};
