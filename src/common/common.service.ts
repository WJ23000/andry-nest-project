import { Injectable, HttpException, ExecutionContext } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcryptjs from 'bcryptjs';
import { User } from '../entity/user.entity';
import { RegisterDto, LoginDto } from './dto/common.dto';
import { AuthService } from '../auth/auth.service'; // 引入封装的jwt服务
import { RedisInstance } from '../utils/redis';

@Injectable()
export class CommonService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly authService: AuthService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { user_name, password, repassword } = registerDto;
    const user = await this.userRepository.findOne({
      where: { user_name },
    });
    if (user) {
      throw new HttpException('用户名已存在！', 4000401);
    }
    // 校验密码是否一致
    if (password !== repassword) {
      throw new HttpException('密码和重复密码不一致，请检查！', 4000401);
    }
    // 解决实体类BeforeInsert、BeforeUpdate方法不触发问题，解决@Exclude()不生效问题
    const entity = await this.userRepository.create(registerDto);
    return await this.userRepository.save(entity);
  }

  async login(loginDto: LoginDto) {
    const { user_name, password } = loginDto;
    const user = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.user_name=:user_name', { user_name })
      .getOne();
    if (!user) {
      throw new HttpException('用户名错误！', 4000401);
    }
    // bcryptjs.compareSync校验密码是否一致，true为验证通过
    if (!bcryptjs.compareSync(password, user.password)) {
      throw new HttpException('密码错误！', 4000401);
    }
    const accessToken = await this.authService.generateToken(user);
    // 将用户信息和token存入redis
    const redis = await RedisInstance.initRedis();
    const key = `${user.id}-${user.user_name}`;
    redis.set(key, accessToken);
    return {
      user,
      token: accessToken,
    };
  }

  async exitLogin(headers) {
    const authorization = headers.authorization;
    const payload = await this.authService.decodeToken(authorization);
    const redis = await RedisInstance.initRedis();
    const key = `${payload.id}-${payload.username}`;
    const redis_token = await redis.get(key);
    if (redis_token) {
      redis.del(key);
    } else {
      throw new HttpException('您未登录，无需退出登录！', 4000401);
    }
    return '退出登录成功';
  }
}
