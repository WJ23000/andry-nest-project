import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { CommonController } from './common.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { AuthModule } from '../auth/auth.module'; // 引入封装的jwt模块

@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthModule],
  controllers: [CommonController],
  providers: [CommonService],
  exports: [TypeOrmModule],
})
export class CommonModule {}
