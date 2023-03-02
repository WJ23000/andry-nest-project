import { Injectable, HttpException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtSecretKey } from './config';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  // 生成token，并返回token
  async generateToken(user: any) {
    const payload = {
      id: user.id,
      username: user.user_name,
      phone: user.phone,
      role: user.role,
    };
    const token = await this.jwtService.sign(payload);
    if (!token) {
      throw new HttpException(`token生成失败，请检查！`, 4000401);
    }
    return token;
  }

  // 解密token，并返回用户信息（token格式：'Bearer xxxxxxxxxxxxxx'）
  async verifyToken(token: string) {
    console.log(token);
    const data = await this.jwtService.verify(
      token.split(' ')[1],
      jwtSecretKey,
    );
    if (!data) {
      throw new HttpException(`token解密失败，请检查！`, 4000401);
    }
    return data;
  }
}
