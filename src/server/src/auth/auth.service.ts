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
  async login(loginDto: LoginDto) {
    const payload = { userName: loginDto.userName };
    const user = await this.usersService.findOne(loginDto.userName);
    const { password, ...result } = user;
    return {
      ...result,
      access_token: this.jwtService.sign(payload),
    };
  }
}
