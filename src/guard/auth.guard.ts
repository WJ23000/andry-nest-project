import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service'; // 引入封装的jwt服务
import { RedisInstance } from '../utils/redis';

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
    const authorization = request['headers'].authorization || void 0;
    let tokenNotTimeOut = true;
    if (authorization) {
      try {
        let payload: any = this.authService.verifyToken(authorization);
        const redis = await RedisInstance.initRedis();
        const redis_token = redis.get('auth:' + payload.username);
        if (!redis_token || redis_token !== authorization) {
          throw new UnauthorizedException('请重新登录');
        }
      } catch (err) {
        tokenNotTimeOut = false;
        throw new UnauthorizedException('请重新登录');
      }
    }
    return tokenNotTimeOut && (super.canActivate(context) as boolean);
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
// 生成跳过检测装饰器
export const IS_PUBLIC_KEY = 'isPublic';
export const isPublicAuth = () => SetMetadata(IS_PUBLIC_KEY, true);
