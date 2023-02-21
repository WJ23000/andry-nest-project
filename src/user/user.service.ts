import { Injectable, HttpException, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

export interface UserRo {
  list: User[];
  count: number;
}

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { userName } = createUserDto;
    const existUser = await this.userRepository.findOne({ where: { userName } });
    if (existUser) {
      throw new HttpException('用户名已存在', 401);
    }
    return await this.userRepository.save(createUserDto);
  }

  async findAll(query): Promise<UserRo> {
    const qb = await this.userRepository.createQueryBuilder('user');
    qb.where('1 = 1');
    qb.orderBy('user.id', 'ASC');
    const count = await qb.getCount();
    const { pageNum = 1, pageSize = 10, ...params } = query;
    qb.limit(pageSize);
    qb.offset(pageSize * (pageNum - 1));
    const list = await qb.getMany();
    return { list, count };
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOne({ where: { id } })
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const existUser = await this.userRepository.findOne({ where: { id } });
    if (!existUser) {
      throw new HttpException(`id为${id}的数据不存在`, 401);
    }
    const updateUser = this.userRepository.merge(existUser, updateUserDto);
    return this.userRepository.save(updateUser);
  }

  async remove(id: number) {
    const existUser = await this.userRepository.findOne({ where: { id } });
    if (!existUser) {
      throw new HttpException(`id为${id}的数据不存在`, 401);
    }
    return await this.userRepository.remove(existUser);
  }

  async batchDelete(ids: number[]) {
    return await this.userRepository.delete(ids);
  }
}
