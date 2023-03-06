import {
  Injectable,
  HttpException,
  UnauthorizedException,
} from '@nestjs/common';
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

  // 校验token（token由header密文，payload密文，签名三部分组成，缺少任何一段都为格式不完整）
  // verify方法没有回调函数，所以采用try...catch...finally
  async verifyToken(token: string) {
    try {
      const data = await this.jwtService.verify(
        token.split(' ')[1],
        jwtSecretKey,
      );
      return data;
    } catch (error) {
      const errorMessage = error.toString();
      switch (errorMessage) {
        case 'TokenExpiredError: jwt expired':
          throw new UnauthorizedException('token已过期！');
        case 'JsonWebTokenError: jwt malformed':
          throw new UnauthorizedException('token格式有误！');
        case 'JsonWebTokenError: invalid signature':
          throw new UnauthorizedException('token无效！');
        default:
          break;
      }
    }
  }
}
