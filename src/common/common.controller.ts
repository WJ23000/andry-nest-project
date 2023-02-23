import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CommonService } from './common.service';
import { RegisterDto, LoginDto } from './dto/create-common.dto';
import { ValidationPipe } from '../pipe/validation/validation.pipe';

@UseInterceptors(ClassSerializerInterceptor) // 搭配实体类@Exclude()方法，返回不包含password字段
@ApiTags('公共')
@Controller('common')
export class CommonController {
  constructor(private readonly commonService: CommonService) {}

  @UsePipes(new ValidationPipe()) // 使用管道验证参数
  @ApiOperation({ summary: '注册' })
  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.commonService.register(registerDto);
  }

  @UsePipes(new ValidationPipe()) // 使用管道验证参数
  @ApiOperation({ summary: '登录' })
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.commonService.login(loginDto);
  }

  @UsePipes(new ValidationPipe()) // 使用管道验证参数
  @ApiOperation({ summary: '退出登录' })
  @Post('exitLogin')
  exitLogin() {
    return this.commonService.exitLogin();
  }
}
