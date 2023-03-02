import { Injectable, HttpException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  // jwt验证，返回token
  async generateToken(user: any) {
    const payload = {
      id: user.id,
      username: user.user_name,
      phone: user.phone,
    };
    const token = await this.jwtService.sign(payload);
    if (!token) {
      throw new HttpException(`token服务异常，请检查！`, 4000401);
    }
    return token;
  }
}
