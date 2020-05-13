import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  // 异常过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
  // 返回成功转换格式
  app.useGlobalInterceptors(new TransformInterceptor());
  // 全局授权中间件
  // app.use(new AuthMiddleware());
  // 静态文件路径
  app.useStaticAssets(join(__dirname, '../public/'), {
    prefix: '/public/',
  });

  await app.listen(3000);
}
bootstrap();
