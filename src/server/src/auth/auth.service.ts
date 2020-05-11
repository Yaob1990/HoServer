import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../dto/loginDto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(userName: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(userName);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  /**
   * 调用到这里的时候，前面已经做了鉴权，这里直接返回需要的内容
   * @param loginDto
   */
  async login(loginDto: LoginDto) {
    const payload = { userName: loginDto.userName };
    const user = await this.usersService.findUserInfo(loginDto.userName);
    const { password, ...result } = user;

    return {
      userInfo: result,
      // 权限点
      permission: [],
      token: this.jwtService.sign(payload),
    };
  }
}
