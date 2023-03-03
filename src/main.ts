import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as csurf from 'csurf';
import rateLimit from 'express-rate-limit';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from '././core/filter/http-exception/http-exception.filter';
import { TransformInterceptor } from '././core/interceptor/transform/transform.interceptor';
import swaggerUi from '././config/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // 设置全局路由前缀
  // app.setGlobalPrefix('andry');
  // 开启cors跨源资源共享
  app.enableCors();
  // 开启csrf跨站点请求伪造保护
  app.use(csurf());
  // 限速（阻止同一个ip短时间大量的发起同一个请求）
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15分钟
      max: 100, // 将每个IP限制为每个windows 100个请求
    }),
  );
  // 注册全局错误的过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
  // 注册全局错误的拦截器
  app.useGlobalInterceptors(new TransformInterceptor());
  // 注册swagger
  swaggerUi(app);
  await app.listen(3000);
}
bootstrap();
