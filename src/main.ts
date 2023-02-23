import { NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from '../src/core/filter/http-exception/http-exception.filter';
import { TransformInterceptor } from '../src/core/interceptor/transform/transform.interceptor';
import swaggerUi from 'config/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // 设置全局路由前缀
  // app.setGlobalPrefix('andry');
  // 注册全局错误的过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
  // 注册全局错误的拦截器
  app.useGlobalInterceptors(new TransformInterceptor());
  // 类序列化拦截器（对save方法无作用）
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  // 注册swagger
  swaggerUi(app);
  await app.listen(3000);
}
bootstrap();
