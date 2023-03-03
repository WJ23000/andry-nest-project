import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtSecretKey } from './config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecretKey.secret,
    });
  }

  // jwt验证，被守卫调用，验证通过返回用户信息
  async validate(payload: any) {
    return {
      id: payload.id,
      username: payload.username,
      phone: payload.phone,
      role: payload.role,
    };
  }
}
