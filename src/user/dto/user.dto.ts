import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UserDto {
  @ApiPropertyOptional({ description: '姓名' })
  readonly user_name: string;

  @ApiPropertyOptional({ description: '手机号' })
  @IsNotEmpty({ message: '手机号不能为空' })
  readonly phone: string;

  @ApiPropertyOptional({ description: '头像' })
  readonly avatar: string;

  @ApiPropertyOptional({ description: '电子邮箱' })
  readonly email: string;
}

export class PaginationDto {
  @ApiProperty({ default: 1, description: '当前页码' })
  @IsNotEmpty({ message: '当前页码不能为空' })
  readonly current: number;

  @ApiProperty({ default: 10, description: '当前页数' })
  @IsNotEmpty({ message: '当前页数不能为空' })
  readonly size: number;
}
