import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  Query,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserDto, PaginationDto } from './dto/user.dto';
import { ValidationPipe } from '../pipe/validation/validation.pipe';

@ApiTags('用户管理')
@UseInterceptors(ClassSerializerInterceptor) // 搭配实体类@Exclude()方法，排除的属性查询时不显示
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes(new ValidationPipe()) // 使用管道验证参数
  @ApiOperation({ summary: '分页查询用户列表' })
  @Get('list')
  async queryUserList(@Query() query: PaginationDto) {
    return await this.userService.queryUserList(query);
  }

  @ApiOperation({ summary: '根据id查询用户信息' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @UsePipes(new ValidationPipe()) // 使用管道验证参数
  @ApiOperation({ summary: '更新用户信息' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() userDto: UserDto) {
    return this.userService.update(id, userDto);
  }

  @ApiOperation({ summary: '删除用户' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @ApiOperation({ summary: '批量删除用户' })
  @Post('batchDelete')
  batchDelete(@Body() ids: string[]) {
    return this.userService.batchDelete(ids);
  }
}
