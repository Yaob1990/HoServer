import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { ApiException } from './api.exception';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR
let errorResponse={}

    if (exception instanceof ApiException) {
      errorResponse={
        msg: (exception as ApiException).getErrorMessage(),
        code: (exception as ApiException).gerErrorCode(),
        path: request.url
      }
    }else{
      const message = exception.message;
      Logger.log('错误提示', message);
       errorResponse = {
        msg: message,
        code: 1, // 自定义code
        path: request.originalUrl, // 错误的url地址
      };
    }

    // 设置返回的状态码、请求头、发送错误信息
    response.status(status);
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.send(errorResponse);




  }
}
