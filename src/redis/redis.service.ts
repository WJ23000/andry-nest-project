import { Injectable } from '@nestjs/common';
import { RedisInstance } from '../utils/redis';
import { RedisDto } from './dto/redis.dto';

@Injectable()
export class RedisService {
  async setKey(redisDto: RedisDto) {
    const { key, value } = redisDto;
    const redis = await RedisInstance.initRedis();
    return redis.set(key, value);
  }

  async getKey(key: string) {
    const redis = await RedisInstance.initRedis();
    return redis.get(key);
  }

  // key存在则修改，不存在则新增
  async updateKey(redisDto: RedisDto) {
    const { key, value } = redisDto;
    const redis = await RedisInstance.initRedis();
    return redis.set(key, value);
  }
}
