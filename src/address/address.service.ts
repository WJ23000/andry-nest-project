import { Injectable } from '@nestjs/common';
import { CreateAddressDto, UpdateAddressDto } from './dto/address.dto';

@Injectable()
export class AddressService {
  create(createAddressDto: CreateAddressDto) {
    return 'This action adds a new address';
  }

  queryAddressList() {
    return `This action returns all address`;
  }

  findOne(id: string) {
    return `This action returns a #${id} address`;
  }

  update(id: string, updateAddressDto: UpdateAddressDto) {
    return `This action updates a #${id} address`;
  }

  remove(id: string) {
    return `This action removes a #${id} address`;
  }
}
