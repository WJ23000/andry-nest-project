import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ description: '用户名' })
  @IsNotEmpty({ message: '用户名不能为空' })
  readonly user_name: string;

  @ApiProperty({ description: '密码' })
  @IsNotEmpty({ message: '密码不能为空' })
  readonly password: string;
}

export class RegisterDto extends LoginDto {
  @ApiProperty({ description: '重复密码' })
  @IsNotEmpty({ message: '重复密码不能为空' })
  readonly repassword: string;
}
