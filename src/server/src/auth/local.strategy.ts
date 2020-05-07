import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from '../dto/loginDto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }
  async validate(loginDto: LoginDto): Promise<any> {
    console.log('============validate');
    const user = await this.authService.validateUser(loginDto);
    console.log(user);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
