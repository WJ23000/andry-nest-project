import { Injectable, HttpException } from '@nestjs/common';
import { RegisterDto, LoginDto } from './dto/common.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcryptjs from 'bcryptjs';
import { User } from '../entity/user.entity';
import { AuthService } from '../auth/auth.service'; // 引入封装的jwt服务
import { RedisInstance } from '../utils/redis';

@Injectable()
export class CommonService {
  constructor(
    private readonly authService: AuthService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, // private readonly authService: AuthService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { user_name, password, repassword } = registerDto;
    const existUser = await this.userRepository.findOne({
      where: { user_name },
    });
    if (existUser) {
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
    // 校验密码是否一致
    if (!bcryptjs.compareSync(password, user.password)) {
      throw new HttpException('密码错误！', 4000401);
    }
    const accessToken = await this.authService.generateToken(user);
    // 将用户信息和token存入redis，并设置失效时间（秒），语法：[key, seconds, value]
    const redis = await RedisInstance.initRedis();
    redis.setex('auth:' + user.user_name, 300, accessToken);
    return {
      user,
      token: accessToken,
    };
  }

  async exitLogin() {
    return `This action returns all common`;
  }
}
