import { IsNotEmpty, IsOptional, MinLength } from 'class-validator';
export class UserDto {
  // 用户名,校验失败，输出内容位message内容
  @MinLength(5, { message: '用户名长度最少5位' })
  readonly userName: string;

  // 密码
  @MinLength(5, { message: '密码长度最少5位' })
  readonly password: string;

  // 真实姓名
  @IsNotEmpty()
  readonly realName: string;
}
