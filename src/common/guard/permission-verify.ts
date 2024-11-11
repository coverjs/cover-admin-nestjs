import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PermisionsGuard implements CanActivate {
  constructor(private readonly prismaService: PrismaService) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const [req] = context.getArgs();
    console.log(req);
    return true;
  }
}
