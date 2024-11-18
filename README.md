# Cover Admin Service

Nestjs 开发的后台管理系统后端服务.
接口文档: http://119.91.231.54:1118/docs

## 技术栈

- Nodejs框架: [Nestjs](https://docs.nestjs.com/)
- ORM: [Prisma](https://www.prisma.io/docs)
- 数据库: MySQL

## 目录结构:

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

## 安装

```sh
pnpm install
```

## 首次运行

- 将 .env.example 重命名为 .env

- 修改 .env 中的配置, 将 DATABASE_URL 改为你的 MySQL 连接地址

- 执行以下命令

```sh
pnpm db:m
```

该命令会自动迁移数据库, 并生成种子数据

## 启动开发环境

```
pnpm dev
```
