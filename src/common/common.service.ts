import { Injectable, HttpException } from '@nestjs/common';
import { RegisterDto, LoginDto } from './dto/common.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcryptjs from 'bcryptjs';
import { User } from '../entity/user.entity';

@Injectable()
export class CommonService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async register(registerDto: RegisterDto) {
    const { user_name, password, repassword } = registerDto;
    const existUser = await this.userRepository.findOne({
      where: { user_name },
    });
    if (existUser) {
      throw new HttpException('用户名已存在！', 401);
    }
    // 校验密码是否一致
    if (password !== repassword) {
      throw new HttpException('密码和重复密码不一致，请检查！', 401);
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
      throw new HttpException('用户名错误！', 401);
    }
    if (!bcryptjs.compareSync(password, user.password)) {
      throw new HttpException('密码错误！', 401);
    }
    return user;
  }

  async exitLogin() {
    return `This action returns all common`;
  }
}
