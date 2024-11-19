import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Logger } from 'nestjs-pino';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(private readonly logger: Logger) {
    super();
  }
  // 创建一个扩展客户端，用于拦截操作
  // xprisma = this.$extends({
  //   query: {
  //     // 拦截所有模型删除和更新操作，判断操作目标是否为种子数据，是则禁止操作
  //     // $allModels: {
  //     //   update: ({ model, args, query }) => {
  //     //     this.verifySeedData(seedData[model], args.where.id);
  //     //     return query(args);
  //     //   },
  //     //   updateMany: ({ model, args, query }) => {
  //     //     this.verifySeedData(seedData[model], args.where.id);
  //     //     return query(args);
  //     //   },
  //     //   delete: ({ model, args, query }) => {
  //     //     this.verifySeedData(seedData[model], args.where.id);
  //     //     return query(args);
  //     //   },
  //     //   deleteMany: ({ model, args, query }) => {
  //     //     this.verifySeedData(seedData[model], args.where.id);
  //     //     return query(args);
  //     //   }
  //     // }
  //   }
  // });

  // 校验是否为种子数据
  // verifySeedData(data, id) {
  //   if (!data || !id) return;
  //   if (data.find((item) => item.id === id)) BusinessException.throwDataProtected();
  // }

  async onModuleInit() {
    try {
      await this.$connect().then((res) => {
        this.logger.log('数据库连接成功');
        return res;
      });
    } catch (error) {
      throw error;
    }
  }

  // async enableShutdownHooks(app: INestApplication) {
  //   this.$on('beforeExit', async () => {
  //     await app.close();
  //   });
  // }
}
