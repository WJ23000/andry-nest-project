import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

// 设置swagger文档，地址：http://localhost:3000/docs
const swaggerUi = (app) => {
  const config = new DocumentBuilder()
    .setTitle('管理后台')
    .setDescription('管理后台接口文档')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true, // 浏览器刷新时支持token缓存
    },
  });
};

export default swaggerUi;
