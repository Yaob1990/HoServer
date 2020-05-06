import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService:ConfigService) {
  }
  getHello(): string {
    console.log("=======")
    console.log(process.env.NODE_ENV)
    console.log("=======")
    console.log(this.configService.get('dataBaseConfig'))
  return   'hello'
    // return 'Hello World!';
  }
}
