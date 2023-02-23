import { Injectable, HttpException, Logger } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from '../entity/address.entity';

export interface UserRo {
  list: Address[];
  count: number;
}

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly userRepository: Repository<Address>,
  ) {}

  async create(createAddressDto: CreateAddressDto): Promise<Address> {
    const { real_name } = createAddressDto;
    const existUser = await this.userRepository.findOne({
      where: { real_name },
    });
    if (existUser) {
      throw new HttpException('用户名已存在', 401);
    }
    return await this.userRepository.save(createAddressDto);
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

  async findOne(id: string): Promise<Address> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async update(id: string, updateUserDto: UpdateAddressDto) {
    const existUser = await this.userRepository.findOne({ where: { id } });
    if (!existUser) {
      throw new HttpException(`id为${id}的数据不存在`, 401);
    }
    const updateUser = this.userRepository.merge(existUser, updateUserDto);
    return this.userRepository.save(updateUser);
  }

  async remove(id: string) {
    const existUser = await this.userRepository.findOne({ where: { id } });
    if (!existUser) {
      throw new HttpException(`id为${id}的数据不存在`, 401);
    }
    return await this.userRepository.remove(existUser);
  }

  async batchDelete(ids: string[]) {
    return await this.userRepository.delete(ids);
  }
}
