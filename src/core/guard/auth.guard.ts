import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../../auth/auth.service'; // 引入封装的jwt服务
import { RedisInstance } from '../../utils/redis';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private reflector: Reflector,
    private readonly authService: AuthService,
  ) {
    super();
  }
  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    // token对比
    const request = context.switchToHttp().getRequest();
    const authorization = request['headers'].authorization || '';
    let tokenNotTimeOut = true;
    if (authorization) {
      // 校验token是否有效，是否过期
      const payload = await this.authService.verifyToken(authorization);
      const redis = await RedisInstance.initRedis();
      const key = `${payload.id}-${payload.username}`;
      const redis_token = await redis.get(key);
      // 抛出未授权异常
      if (!redis_token) {
        throw new UnauthorizedException('用户未登录，请重新登录！');
      }
      if (redis_token !== authorization.split(' ')[1]) {
        throw new UnauthorizedException('请检查token是否有效！');
      }
    }
    return tokenNotTimeOut && (super.canActivate(context) as boolean);
  }

  // 校验请求header是否携带Authorization参数
  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new UnauthorizedException('需要登录权限访问');
    }
    return user;
  }
}
// 生成跳过token检测装饰器
// 使用@isPublicAuth()时，不可使用@UseInterceptors(new RbacInterceptor(1))调用rbac拦截器验证角色权限
export const IS_PUBLIC_KEY = 'isPublic';
export const isPublicAuth = () => SetMetadata(IS_PUBLIC_KEY, true);
