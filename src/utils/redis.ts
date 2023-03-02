import Redis from 'ioredis';
import { localConfig, prodConfig } from '../config/config';

// 本地运行是没有process.env.NODE_ENV的，借此来区分本地环境和生成环境
const config = process.env.NODE_ENV ? prodConfig : localConfig;
const redisConfig = config.redis;
const redisClusterConfig = config.redisCluster;
export class RedisInstance {
  static async initRedis(connectType?: string, db = 0) {
    if (connectType && connectType === 'cluster') {
      const cluster = new Redis.Cluster(redisClusterConfig);
      cluster.on('error', (err) => console.log('Redis cluster Error', err));
      cluster.on('connect', () => console.log('redis集群连接成功'));
      return cluster;
    } else {
      const redis = new Redis({ ...redisConfig, db });
      redis.on('error', (err) => console.log('Redis cluster Error', err));
      redis.on('connect', () => console.log('redis连接成功'));
      return redis;
    }
  }
}
