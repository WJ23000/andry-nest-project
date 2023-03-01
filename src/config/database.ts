import { registerAs } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { User, Address } from './entity';

const platform = process.env.NODE_ENV;
Logger.log('当前环境', platform); // process.env打包后才会执行
export default registerAs('database', () => ({
  type: process.env.DB_TYPE, // 数据库类型
  host: process.env.DB_HOST, // 主机
  port: parseInt(process.env.DB_PORT, 10), // 端口号
  username: process.env.DB_USERNAME, // 用户名
  password: process.env.DB_PASSWORD, // 密码
  database: process.env.DB_DATABASE, // 数据库名
  entities: [User, Address], // 实体-数据库表
  autoLoadEntities: true, // true: 自动查找Entity实体并加载
  synchronize: false, // true：根据实体自动创建数据库表（生产环境建议关闭）
  timezone: '+08:00', // 服务器上配置的时区
}));
