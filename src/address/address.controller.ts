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
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { ValidationPipe } from '../pipe/validation/validation.pipe';

@ApiTags('收货地址')
@Controller('user')
export class AddressController {
  constructor(private readonly userService: AddressService) {}

  @UsePipes(new ValidationPipe()) // 使用管道验证参数
  @ApiOperation({ summary: '创建用户' })
  @Post('create')
  async create(@Body() createUserDto: CreateAddressDto) {
    return await this.userService.create(createUserDto);
  }

  @ApiOperation({ summary: '查询用户列表' })
  @Get('list')
  async findAll(@Query() query) {
    return await this.userService.findAll(query);
  }

  @ApiOperation({ summary: '查询单个用户' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @ApiOperation({ summary: '更新单个用户信息' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateAddressDto) {
    return this.userService.update(id, updateUserDto);
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
