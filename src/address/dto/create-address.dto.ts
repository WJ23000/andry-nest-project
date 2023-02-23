import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAddressDto {
  @ApiProperty({ description: '姓名' })
  @IsNotEmpty({ message: '姓名不能为空' })
  @IsString({ message: '姓名必须是 string 类型' })
  readonly real_name: string;

  @ApiProperty({ description: '手机号' })
  @IsNotEmpty({ message: '手机号不能为空' })
  readonly phone: string;

  @ApiPropertyOptional({ description: '省份' })
  readonly province?: string;

  @ApiPropertyOptional({ description: '城市' })
  readonly city?: string;

  @ApiPropertyOptional({ description: '尊称' })
  readonly honorific_title?: string;

  @ApiPropertyOptional({ description: '地址类型' })
  readonly type?: string;

  @ApiPropertyOptional({ description: '创建时间' })
  readonly create_time?: Date;

  @ApiPropertyOptional({ description: '更新时间' })
  readonly update_time?: Date;
}
