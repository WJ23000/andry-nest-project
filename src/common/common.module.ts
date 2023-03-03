import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonService } from './common.service';
import { CommonController } from './common.controller';
import { User } from '../entity/user.entity';
import { AuthModule } from '../auth/auth.module'; // 引入auth模块

@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthModule],
  controllers: [CommonController],
  providers: [CommonService],
  exports: [TypeOrmModule, CommonService],
})
export class CommonModule {}
