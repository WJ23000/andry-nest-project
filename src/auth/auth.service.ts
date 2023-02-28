import { Injectable, HttpException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  // jwt验证，返回token
  async generateToken(user: any) {
    const payload = {
      username: user.username,
    };
    const token = await this.jwtService.sign(payload);
    if (!token) {
      throw new HttpException(`加密数据异常，请检查！`, 401);
    }
    return token;
  }
}
