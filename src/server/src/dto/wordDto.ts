import { MinLength} from 'class-validator';
export class WordDto {
  // 内容,校验失败，输出内容位message内容
  @MinLength(1,{message:"内容不能为空"})
  readonly  word:string
  // 来源
  @MinLength(1,{message:'来源不能为空'})
  readonly  from:string
  // 原始地址（网址）
  readonly source:string
}
