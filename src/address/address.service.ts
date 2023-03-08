import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from '../entity/address.entity';
import {
  CreateAddressDto,
  UpdateAddressDto,
  PaginationDto,
} from './dto/address.dto';

export interface UserRo {
  list: Address[];
  total: number;
}

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}

  async create(createAddressDto: CreateAddressDto, req) {
    const uid = req.user.id;
    createAddressDto.uid = uid;
    // 解决实体类BeforeInsert、BeforeUpdate方法不触发问题，解决@Exclude()不生效问题
    const entity = await this.addressRepository.create(createAddressDto);
    return await this.addressRepository.save(entity);
  }

  async queryAddressList(query: PaginationDto, req): Promise<UserRo> {
    const uid = req.user.id;
    const { current, size } = query;
    const qb = await this.addressRepository.createQueryBuilder('address');
    qb.where({ uid });
    qb.orderBy('address.id', 'ASC');
    const total = await qb.getCount();
    qb.limit(size);
    qb.offset(size * (current - 1));
    const list = await qb.getMany();
    return { list, total };
  }

  async findOne(id: string) {
    const data = await this.addressRepository.findOne({ where: { id } });
    if (!data) {
      throw new HttpException(`该数据不存在！`, 401);
    }
    return data;
  }

  async update(id: string, updateAddressDto: UpdateAddressDto) {
    const data = await this.addressRepository.findOne({ where: { id } });
    if (!data) {
      throw new HttpException(`该数据不存在！`, 401);
    }
    const updateUser = this.addressRepository.merge(data, updateAddressDto);
    return this.addressRepository.save(updateUser);
  }

  async remove(id: string) {
    const data = await this.addressRepository.findOne({ where: { id } });
    if (!data) {
      throw new HttpException('该数据不存在！', 401);
    }
    return await this.addressRepository.remove(data);
  }
}
