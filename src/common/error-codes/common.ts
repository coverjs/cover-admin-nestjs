export const COMMON_ERROR_CODE = {
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

  // 演示环境,禁止操作
  DEMO_ENV_FORBIDDEN: {
    code: 403,
    msg: {
      'zh-CN': '演示环境,禁止操作',
      'en-US': 'Demo environment, forbidden operation'
    }
  }
};
