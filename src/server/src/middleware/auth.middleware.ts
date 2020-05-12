import { Injectable, NestMiddleware } from '@nestjs/common';
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
      throw new ApiException('签名校验失败', ApiCode.SIGN_ERROR, 200);
    }
  }
}
