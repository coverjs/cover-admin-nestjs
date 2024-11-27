export default {
  // token有效期  为了兼容redis缓存有效期这里应该使用number类型
  tokenExpires: 60 * 60 * 24 * 7,

  // 管理员角色名称, 用于判断当前用户是否为管理员, 管理员将赋予所有权限
  adminRole: 'admin',

  // 静态资源域名
  staticDomain: 'http://127.0.0.1'
};
