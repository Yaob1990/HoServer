import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { ApiException } from '../filters/api.exception';
import { ApiCode } from '../enums/api-code.enums';
import * as _ from 'lodash';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    // 元数据
    const object = plainToClass(metatype, value);
    // 校验
    const errors = await validate(object);
    if (errors.length > 0) {
      // throw new BadRequestException('参数校验失败');
      const errorMessage = errors.map(item => {
        return _.values(item.constraints)[0]
      });
      throw new ApiException(`参数校验失败,${errorMessage}`,ApiCode.PARAMS_ERROR, 200);
    }
    return value;
  }

  private toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find((type) => metatype === type);
  }
}
