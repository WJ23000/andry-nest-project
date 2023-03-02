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
import { RegisterDto, LoginDto } from './dto/common.dto';
import { ValidationPipe } from '../pipe/validation/validation.pipe';
import { isPublicAuth } from '../guard/auth.guard';

@ApiTags('公共')
@UseInterceptors(ClassSerializerInterceptor) // 搭配实体类@Exclude()方法，排除的属性查询时不显示
@Controller('common')
export class CommonController {
  constructor(private readonly commonService: CommonService) {}

  @ApiOperation({ summary: '注册' })
  @isPublicAuth() // 跳过jwt验证
  @UsePipes(new ValidationPipe()) // 调用管道验证参数
  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.commonService.register(registerDto);
  }

  @ApiOperation({ summary: '登录' })
  @isPublicAuth() // 跳过jwt验证
  @UsePipes(new ValidationPipe()) // 调用管道验证参数
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.commonService.login(loginDto);
  }

  @ApiOperation({ summary: '退出登录' })
  @Post('exitLogin')
  exitLogin() {
    return this.commonService.exitLogin();
  }
}
