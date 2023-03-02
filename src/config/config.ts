// 本地环境配置
const localConfig = {
  database: {
    type: 'mysql',
    host: 'localhost',
    port: '3306',
    username: 'root',
    password: 'root',
    database: 'andry_nest',
  },
  redis: {
    port: 6379,
    host: '127.0.0.1',
    password: '',
  },
  redisCluster: [
    {
      port: 9736,
      host: 'xxx.xx.xx.xx',
      password: '',
    },
    {
      port: 9736,
      host: 'xxx.xx.xx.xx',
      password: '',
    },
  ],
};

// 生产环境配置
const prodConfig = {
  database: {
    type: 'mysql',
    host: 'localhost',
    port: '3306',
    username: 'root',
    password: 'wj_123456',
    database: 'andry_nest',
  },
  redis: {
    port: 6379,
    host: '127.0.0.1',
    password: '',
  },
  redisCluster: [
    {
      port: 9736,
      host: 'xxx.xx.xx.xx',
      password: '',
    },
    {
      port: 9736,
      host: 'xxx.xx.xx.xx',
      password: '',
    },
  ],
};

export { localConfig, prodConfig };
