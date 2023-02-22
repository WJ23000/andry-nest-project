import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: '用户名' })
  @IsNotEmpty({ message: '用户名不能为空' })
  readonly userName: string;

  @ApiProperty({ description: '真实姓名' })
  @IsNotEmpty({ message: '真实姓名不能为空' })
  @IsString({ message: '真实姓名必须是 string 类型' })
  readonly realName: string;

  @ApiProperty({ description: '密码' })
  @IsNotEmpty({ message: '密码不能为空' })
  readonly password: string;

  @ApiProperty({ description: '重复密码' })
  @IsNotEmpty({ message: '重复密码不能为空' })
  readonly repassword: string;

  @ApiProperty({ description: '手机号' })
  @IsNotEmpty({ message: '手机号不能为空' })
  readonly phone: string;

  @ApiPropertyOptional({ description: '年龄' })
  // @IsNumber({}, { message: '年龄必须是 number 类型' })
  readonly age?: number;

  @ApiPropertyOptional({ description: '性别' })
  readonly sex?: string;

  @ApiPropertyOptional({ description: '角色' })
  readonly role?: string;

  @ApiPropertyOptional({ description: '省份' })
  readonly province?: string;

  @ApiPropertyOptional({ description: '城市' })
  readonly city?: string;

  @ApiPropertyOptional({ description: '创建时间' })
  readonly createTime?: Date;

  @ApiPropertyOptional({ description: '更新时间' })
  readonly updateTime?: Date;
}
