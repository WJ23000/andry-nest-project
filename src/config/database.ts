import { registerAs } from '@nestjs/config';
import { User, Address } from './entity';
import { localConfig, prodConfig } from './config';

// 本地运行是没有process.env.NODE_ENV的，借此来区分本地环境和生成环境
const config = process.env.NODE_ENV ? prodConfig : localConfig;
const db = config.database;

export default registerAs('database', () => ({
  type: db.type, // 数据库类型
  host: db.host, // 主机
  port: parseInt(db.port, 10), // 端口号
  username: db.username, // 用户名
  password: db.password, // 密码
  database: db.database, // 数据库名
  entities: [User, Address], // 实体-数据库表
  autoLoadEntities: true, // true: 自动查找Entity实体并加载
  synchronize: false, // true：根据实体自动创建数据库表（生产环境建议关闭）
  timezone: '+08:00', // 服务器上配置的时区
}));
