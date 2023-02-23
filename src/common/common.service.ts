import { Injectable, HttpException } from '@nestjs/common';
import { RegisterDto, LoginDto } from './dto/create-common.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
      throw new HttpException('用户名已存在', 401);
    }
    // 校验密码是否一致
    if (password !== repassword) {
      throw new HttpException('密码和重复密码不一致，请检查', 401);
    }
    return await this.userRepository.save(registerDto);
  }

  async login(loginDto: LoginDto) {
    return `This action returns all common`;
  }

  async exitLogin() {
    return `This action returns all common`;
  }
}
