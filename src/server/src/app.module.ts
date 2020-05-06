import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule,ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { WordModule } from './word/word.module';
import database from './config/database'

console.log(process.env.NODE_ENV)
const envFilePath =
  process.env.NODE_ENV === 'development'
    ? '.env.development'
    : '.env';
@Module({
  imports: [ConfigModule.forRoot(
    { isGlobal: true,envFilePath,load: [database] },
  ),
    TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: (config: ConfigService) => config.get('dataBaseConfig'),
    inject: [ConfigService],
  }),
    WordModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
