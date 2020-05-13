export enum ApiCode {
  TIMEOUT = -1, // 系统繁忙
  SUCCESS = 0, // 请求成功
  ERROR = 1, // 请求失败

  BUSINESS_ERROR = 4001, // 业务错误
  PARAMS_ERROR = 4002, // 参数不合法
  SIGN_ERROR = 4003, // 验签失败
  TOKEN_ERROR = 4004, // token不合法
  EXIST_ERROR = 4005, // 资源已经存在
  FILE_TYPE_ERROR = 4006, // 文件类型错误
  SOURCE_ERROR = 4007, // 资源不存在
}
