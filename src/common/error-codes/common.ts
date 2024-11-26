// 公共的服务端异常: 50xx
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
  ILEGAL_SESSION_ID: {
    code: 5000,
    msg: {
      'zh-CN': '缺失会话ID',
      'en-US': 'Missing session ID'
    }
  },
  MISSING_COOKIE: {
    code: 5000,
    msg: {
      'zh-CN': '缺失cookie',
      'en-US': 'Missing cookie'
    }
  },
  REDIS_TX_FAIL: {
    code: 5000,
    msg: {
      'zh-CN': 'redis事务执行失败',
      'en-US': 'Redis transaction execution failed'
    }
  }
};
