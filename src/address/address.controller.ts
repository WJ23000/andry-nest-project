import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UsePipes,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AddressService } from './address.service';
import {
  CreateAddressDto,
  UpdateAddressDto,
  PaginationDto,
} from './dto/address.dto';
import { ValidationPipe } from '../core/pipe/validation/validation.pipe';
import { RbacInterceptor } from '../core/interceptor/rbac/rbac.interceptor';

@ApiTags('收货地址')
@Controller('address')
@UseInterceptors(ClassSerializerInterceptor) // 搭配实体类@Exclude()方法，排除的属性查询时不显示
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @ApiOperation({ summary: '新增用户收货地址' })
  @ApiBearerAuth() // swagger请求header会携带Authorization参数
  @UseInterceptors(new RbacInterceptor(1)) // 调用rbac拦截器验证角色权限
  @UsePipes(new ValidationPipe()) // 调用管道验证参数
  @Post('create')
  create(@Body() createAddressDto: CreateAddressDto) {
    return this.addressService.create(createAddressDto);
  }

  @ApiOperation({ summary: '分页查询用户收货地址列表' })
  @ApiBearerAuth() // swagger请求header会携带Authorization参数
  @UseInterceptors(new RbacInterceptor(1)) // 调用rbac拦截器验证角色权限
  @UsePipes(new ValidationPipe()) // 调用管道验证参数
  @Get('list')
  queryAddressList(@Query() query: PaginationDto) {
    return this.addressService.queryAddressList();
  }

  @ApiOperation({ summary: '根据id查询收货地址信息' })
  @ApiBearerAuth() // swagger请求header会携带Authorization参数
  @UseInterceptors(new RbacInterceptor(1)) // 调用rbac拦截器验证角色权限
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.addressService.findOne(id);
  }

  @ApiOperation({ summary: '更新收货地址信息' })
  @ApiBearerAuth() // swagger请求header会携带Authorization参数
  @UseInterceptors(new RbacInterceptor(1)) // 调用rbac拦截器验证角色权限
  @UsePipes(new ValidationPipe()) // 调用管道验证参数
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
    return this.addressService.update(id, updateAddressDto);
  }

  @ApiOperation({ summary: '删除收货地址' })
  @ApiBearerAuth() // swagger请求header会携带Authorization参数
  @UseInterceptors(new RbacInterceptor(1)) // 调用rbac拦截器验证角色权限
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.addressService.remove(id);
  }
}
