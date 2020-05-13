import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WordModule } from './word/word.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import database from './config/database';
import { AuthMiddleware } from './middleware/auth.middleware';
import { UploadModule } from './module/upload/upload.module';

console.log(process.env.NODE_ENV);
const envFilePath =
  process.env.NODE_ENV === 'development' ? '.env.development' : '.env';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath, load: [database] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get('dataBaseConfig'),
      inject: [ConfigService],
    }),
    WordModule,
    AuthModule,
    UserModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
// export class AppModule {}
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(AuthMiddleware)
      // 排除登录路径
      .exclude(
        { path: '/public/**', method: RequestMethod.ALL },
        { path: '/user/login', method: RequestMethod.ALL },
      )
      // 对所有路由启用
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
