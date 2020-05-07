import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { AuthMiddleware } from './middleware/auth.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // 异常过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
  // 返回成功转换格式
  app.useGlobalInterceptors(new TransformInterceptor());
  // 全局授权中间件
  // app.use(new AuthMiddleware());

  await app.listen(3000);
}
bootstrap();
