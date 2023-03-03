import { Injectable, HttpException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcryptjs from 'bcryptjs';
import { User } from '../entity/user.entity';
import { UserDto, PaginationDto } from './dto/user.dto';

export interface UserRo {
  list: User[];
  total: number;
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async queryUserList(query: PaginationDto): Promise<UserRo> {
    const { current, size } = query;
    const qb = await this.userRepository.createQueryBuilder('user');
    qb.orderBy('user.id', 'ASC');
    const total = await qb.getCount();
    qb.limit(size);
    qb.offset(size * (current - 1));
    const list = await qb.getMany();
    return { list, total };
  }

  async findOne(id: string): Promise<User> {
    const data = await this.userRepository.findOne({ where: { id } });
    if (!data) {
      throw new HttpException(`该数据不存在！`, 4000401);
    }
    return data;
  }

  async update(id: string, userDto: UserDto) {
    const data = await this.userRepository.findOne({ where: { id } });
    if (!data) {
      throw new HttpException(`该数据不存在！`, 4000401);
    }
    const updateUser = this.userRepository.merge(data, userDto);
    return this.userRepository.save(updateUser);
  }

  async remove(id: string) {
    const data = await this.userRepository.findOne({ where: { id } });
    if (!data) {
      throw new HttpException('该数据不存在！', 4000401);
    }
    return await this.userRepository.remove(data);
  }

  async batchDelete(ids: string[]) {
    return await this.userRepository.delete(ids);
  }

  // 查询用户
  async queryUser(user_name, password) {
    const user = await this.userRepository.findOne({
      where: { user_name },
    });
    // bcryptjs.compareSync校验密码是否一致，true为验证通过
    if (user && bcryptjs.compareSync(password, user.password)) {
      return user;
    }
    return null;
  }
}
