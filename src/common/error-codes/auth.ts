// 身份校验: 40x
export const AUTH_ERROR_CODE = {
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
   * 演示环境,禁止操作
   */
  DEMO_ENV_FORBIDDEN: {
    code: 402,
    msg: {
      'zh-CN': '演示环境,禁止操作',
      'en-US': 'Demo environment, forbidden operation'
    }
  },

  LOGIN_OTHER_DEVICE: {
    code: 500,
    msg: {
      'zh-CN': '当前账号已在其他设备登录',
      'en-US': 'The current account has logged in on another device'
    }
  }
};
