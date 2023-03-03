import { Injectable, HttpException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { jwtSecretKey } from './config';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  // 校验用户
  async validateUser(username, password): Promise<any> {
    return await this.userService.queryUser(username, password);
  }

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

  // 校验token是否过期
  async verifyToken(token: string) {}

  // 解密token
  async decodeToken(token: string) {
    const data = await this.jwtService.verifyAsync(
      token.split(' ')[1],
      jwtSecretKey,
    );
    if (!data) {
      throw new HttpException(`token解密失败，请检查！`, 4000401);
    }
    return data;
  }
}
