import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  ForbiddenException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RbacInterceptor implements NestInterceptor {
  // role[用户角色]: 0-超级管理员 | 1-管理员 | 2-开发&测试&运营 | 3-普通用户（只能查看）
  constructor(private readonly role: number) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // request：jwt.strategy.ts文件validate方法返回的用户信息
    const request = context.getArgByIndex(1).req;
    // 抛出禁止的异常（当前用户的权限大于接口设置的权限时）
    if (request.user.role > this.role) {
      throw new ForbiddenException('对不起，权限不足，请联系管理员！');
    }
    return next.handle();
  }
}
