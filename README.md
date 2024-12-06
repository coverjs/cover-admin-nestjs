# Cover Admin Service

Nestjs 开发的后台管理系统后端服务.
接口文档: http://119.91.231.54:1118/docs

## 技术栈

- Nodejs框架: [Nestjs](https://docs.nestjs.com/)
- ORM: [Prisma](https://www.prisma.io/docs)
- 数据库: MySQL
- 缓存: Redis

## 目录结构

```
.
├── dist
├── prisma # 数据模型
│ └── migrations
├── src # 源码
│ ├── common # 公共模块
│ │ ├── constants
│ │ ├── decorators
│ │ ├── dto
│ │ ├── exceptions
│ │ ├── guard
│ │ ├── interceptor
│ │ ├── pipes
│ │ ├── prisma
│ │ └── types
│ ├── modules # 业务模块
│ └── utils # 工具
└── test # 测试用例
```

## 先决条件

- Nodejs 16.x 或更高版本
- pnpm 9.x
- MySQL 8.x 及以上
- Redis 7.x 及以上

## 安装

```sh
pnpm install
```

## 首次运行

### 配置环境变量

- 将 .env.example 复制并重命名为 .env
- 修改 .env 中的配置, 将 DATABASE_URL 改为你的 MySQL 连接地址
- 修改.env 中的 REDIS_URL 为你本地的 Redis 的连接地址
- 修改 .env 中的 JWT_SECRET 为一个随机字符串, 用于加密 JWT
- 修改 .env 中的 PORT 为你想要的端口, 默认是 1118

### 执行以下命令

```sh
# 该命令会自动迁移数据库, 并初始化数据
pnpm db:m
```

### 启动开发环境

```
pnpm dev
```

### debug

- 在vscode中按F5进入调试模式

启动vscode的调试模式之后就可以使用断点调试了
