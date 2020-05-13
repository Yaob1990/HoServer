import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from '../dto/userDto';
import { ValidationPipe } from '../pipe/validation.pipe';
import { LoginDto } from '../dto/loginDto';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  register(@Body() userDto: UserDto) {
    return this.userService.register(userDto);
  }

  @Post('login')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard('local'))
  login(@Body() loginDto: LoginDto) {
    console.log('login');
    console.log(loginDto);

    return this.authService.login(loginDto);
  }

  @Get('current')
  current(@Headers() headers) {
    const userName = headers.userName;

    return this.userService.findUserInfo(userName);
  }

  @Post('update/:id')
  @HttpCode(200)
  update(@Headers('userName') userName: string, @Body() userInfo) {
    return this.userService.updateUserInfo(userInfo, userName);
  }

  @Get('users')
  users() {
    return this.userService.all();
  }
}
