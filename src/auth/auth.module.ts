import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { UserModule } from '../user/user.module'; // 引入user模块
import { JwtStrategy } from './jwt.strategy';
import { jwtSecretKey } from './config';
import { JwtAuthGuard } from '../core/guard/auth.guard';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtSecretKey.secret,
      signOptions: { expiresIn: '2h' }, // token过期时效，这里设置为2h(不加单位默认为ms)，token可以被别人复制使用（有效期不可以设置过长）
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard, // 给所有接口增加JwtAuthGuard守卫，校验jwt和单点登录
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
