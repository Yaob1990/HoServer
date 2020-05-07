import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UsePipes,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from '../dto/userDto';
import { ValidationPipe } from '../pipe/validation.pipe';
import { LoginDto } from '../dto/loginDto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  all() {
    return this.userService.all();
  }

  @Post('register')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  register(@Body() userDto: UserDto) {
    return this.userService.register(userDto);
  }

  @Post('login')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  login(@Body() loginDto: LoginDto) {
    return this.userService.login(loginDto);
  }
}
