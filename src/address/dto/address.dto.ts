import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Pagination } from '../../global/page.dto';

export enum HonorificTitleType {
  MAN = '1', // 先生
  WOMAN = '2', // 女士
}

export enum Type {
  HOME = '1', // 家
  COMPANY = '2', // 公司
  OTHER = '3', // 公司
}

export class CreateAddressDto {
  @ApiProperty({
    title: '用户id',
    description: '用户id',
    default: '',
  })
  @IsNotEmpty({ message: '用户id不能为空' })
  readonly uid: string;

  @ApiProperty({
    title: '收货人',
    description: '收货人',
    default: '',
  })
  @IsNotEmpty({ message: '收货人不能为空' })
  readonly real_name: string;

  @ApiProperty({
    title: '手机号',
    description: '手机号',
    default: '',
  })
  @IsNotEmpty({ message: '手机号不能为空' })
  readonly phone: string;

  @ApiPropertyOptional({
    title: '省份',
    description: '省份',
    default: '',
  })
  readonly provice: string;

  @ApiPropertyOptional({
    title: '地址',
    description: '地址',
    default: '',
  })
  readonly city: string;

  @ApiPropertyOptional({
    type: 'enum',
    title: '尊称',
    description: '尊称',
    default: HonorificTitleType.MAN,
  })
  readonly honorific_title: string;

  @ApiPropertyOptional({
    type: 'enum',
    title: '地址类型',
    description: '地址类型',
    default: Type.HOME,
  })
  readonly type: string;
}

export class UpdateAddressDto {}

export class PaginationDto extends Pagination {}
