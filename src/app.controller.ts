import { Controller, Get, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('示例')
@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('list')
  getHello(): string {
    return this.appService.getHello();
  }

  // 可以匹配到 post请求，http://localhost:9080/app/list
  @Post('list')
  create(): string {
    return 'post';
  }

  // 2.通配符路径(?+* 三种通配符 )
  // 可以匹配到 get请求, http://localhost:9080/app/user_xxx
  @Get('user_*')
  getUser() {
    return 'getUser';
  }

  // 3.带参数路径
  // 可以匹配到put请求，http://localhost:9080/app/list/xxxx
  @Put('list/:id')
  update() {
    return 'update';
  }
}
