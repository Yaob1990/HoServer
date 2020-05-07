import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { jwtConstants } from '../auth/constants';
import { ApiException } from '../filters/api.exception';
import { ApiCode } from '../enums/api-code.enums';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const authHeaders = req.headers.authorization;
    if (authHeaders && (authHeaders as string).split(' ')[1]) {
      const token = (authHeaders as string).split(' ')[1];
      console.log(`token:${token}`);
      // { username: 'john', sub: 1, iat: 1588819515, exp: 1594003515 } 解码出来是这个格式
      try {
        const decoded: any = jwt.verify(token, jwtConstants.secret);
        if (decoded.username) {
          next();
        } else {
          throw new ApiException('签名校验失败', ApiCode.SIGN_ERROR, 200);
        }
      } catch (e) {
        throw new ApiException('签名校验失败', ApiCode.SIGN_ERROR, 200);
      }
    } else {
      throw new ApiException('签名校验失败', ApiCode.SIGN_ERROR, 200);
    }
  }
}
