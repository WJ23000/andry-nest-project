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
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserDto, PaginationDto } from './dto/user.dto';
import { ValidationPipe } from '../core/pipe/validation/validation.pipe';
import { RbacInterceptor } from '../core/interceptor/rbac/rbac.interceptor';

@ApiTags('用户管理')
@UseInterceptors(ClassSerializerInterceptor) // 搭配实体类@Exclude()方法，排除的属性查询时不显示
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '分页查询用户列表' })
  @ApiBearerAuth() // swagger请求header会携带Authorization参数
  @UseInterceptors(new RbacInterceptor(1)) // 调用rbac拦截器验证角色权限
  @UsePipes(new ValidationPipe()) // 调用管道验证参数
  @Get('list')
  async queryUserList(@Query() query: PaginationDto) {
    return await this.userService.queryUserList(query);
  }

  @ApiOperation({ summary: '根据id查询用户信息' })
  @ApiBearerAuth() // swagger请求header会携带Authorization参数
  @UseInterceptors(new RbacInterceptor(1)) // 调用rbac拦截器验证角色权限
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @ApiOperation({ summary: '更新用户信息' })
  @UsePipes(new ValidationPipe()) // 调用管道验证参数
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
