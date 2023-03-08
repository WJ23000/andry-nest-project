import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Pagination } from '../../global/page.dto';

export class CreateUserDto {}

export class UpdateUserDto {
  @ApiPropertyOptional({
    title: '姓名',
    description: '姓名',
    default: '',
  })
  readonly user_name: string;

  @ApiProperty({
    title: '手机号',
    description: '手机号',
    default: '',
  })
  @IsNotEmpty({ message: '手机号不能为空' })
  readonly phone: string;

  @ApiPropertyOptional({
    title: '头像',
    description: '头像',
    default: '',
  })
  readonly avatar: string;

  @ApiPropertyOptional({
    title: '电子邮箱',
    description: '电子邮箱',
    default: '',
  })
  readonly email: string;
}

export class PaginationDto extends Pagination {}
