import { IsNotEmpty, IsNumber, IsString, IsEmpty } from'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: '用户名不能为空' })
  readonly userName: string | number;
  @IsNotEmpty({ message: '真实姓名不能为空' })
  @IsString({ message: '真实姓名必须是 String 类型' })
  readonly realName: string;
  @IsNotEmpty({ message: '密码不能为空' })
  readonly password: string;
  @IsNotEmpty({ message: '重复密码不能为空' })
  readonly repassword: string;
  @IsNotEmpty({ message: '手机号不能为空' })
  readonly phone: string;
  @IsEmpty({ message: '角色可能为空' })
  readonly role?: string | number;
}
