import {
  ApiProperty,
  ApiPropertyOptional,
  IntersectionType,
} from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateDateTime } from '../../global/page.dto';

export class LoginDto {
  @ApiProperty({
    title: '重复密码',
    description: '用户名',
    default: '',
  })
  @IsNotEmpty({ message: '用户名不能为空' })
  readonly user_name: string;

  @ApiProperty({
    title: '重复密码',
    description: '密码',
    default: '',
  })
  @IsNotEmpty({ message: '密码不能为空' })
  readonly password: string;
}

export class RegisterDto extends IntersectionType(LoginDto, CreateDateTime) {
  @ApiProperty({
    title: '重复密码',
    description: '重复密码',
    default: '',
  })
  @IsNotEmpty({ message: '重复密码不能为空' })
  readonly repassword: string;
}
