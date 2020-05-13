import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { jwtConstants } from '../auth/constants';
import { ApiException } from '../filters/api.exception';
import { ApiCode } from '../enums/api-code.enums';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log('中间件');
    console.log(req);
    const token = req.headers.token;
    if (token) {
      // { userName: 'john', sub: 1, iat: 1588819515, exp: 1594003515 } 解码出来是这个格式
      try {
        const decoded: any = jwt.verify(token, jwtConstants.secret);
        if (decoded.userName) {
          req.headers.userName = decoded.userName;
          next();
        } else {
          throw new ApiException('签名校验失败', ApiCode.SIGN_ERROR, 200);
        }
      } catch (e) {
        console.log(e);
        throw new ApiException('签名校验失败', ApiCode.SIGN_ERROR, 200);
      }
    } else {
      // public 目录内容（静态资源，用户上传）不校验
      if (req.baseUrl.startsWith('/public/')) {
        throw new ApiException(
          '资源不存在',
          ApiCode.SOURCE_ERROR,
          HttpStatus.NOT_FOUND,
        );
      } else {
        throw new ApiException('签名校验失败', ApiCode.SIGN_ERROR, 200);
      }
    }
  }
}
