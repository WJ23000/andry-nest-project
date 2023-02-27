import { Controller, Post, Get, Body, Param, UsePipes } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { RedisService } from './redis.service';
import { RedisDto } from './dto/redis.dto';
import { ValidationPipe } from '../pipe/validation/validation.pipe';

@ApiTags('Redis操作')
@Controller('redis')
export class RedisController {
  constructor(private readonly redisService: RedisService) {}

  @UsePipes(new ValidationPipe()) // 使用管道验证参数
  @ApiOperation({ summary: '设置key' })
  @Post('add')
  setKey(@Body() redisDto: RedisDto) {
    return this.redisService.setKey(redisDto);
  }

  @ApiOperation({ summary: '获取key' })
  @Get(':key')
  getKey(@Param('key') key: string) {
    return this.redisService.getKey(key);
  }

  @UsePipes(new ValidationPipe()) // 使用管道验证参数
  @ApiOperation({ summary: '更新key' })
  @Post('update')
  updateKey(@Body() redisDto: RedisDto) {
    return this.redisService.updateKey(redisDto);
  }
}
