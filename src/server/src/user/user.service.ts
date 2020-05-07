import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';
import { UserDto } from '../dto/userDto';
import { ApiException } from '../filters/api.exception';
import { ApiCode } from '../enums/api-code.enums';
import { LoginDto } from '../dto/loginDto';

export type User = any;

@Injectable()
export class UserService {
  // 注入数据库表
  constructor(
    @InjectRepository(UserEntity)
    private readonly userReposition: Repository<UserEntity>,
  ) {}

  async all() {
    const result = await this.userReposition.find({
      where: {
        userName: 'Yao',
      },
    });
    console.log(result);
    return result;
  }

  async findOne(username: string): Promise<User | undefined> {
    console.log('user 校验');
    // return this.users.find(user => user.username === username);
  }

  async login(loginDto: LoginDto) {

  }

  async register(userDto: UserDto) {
    // 查找是否存在
    const exist = await this.userReposition.findOne({
      userName: userDto.userName,
    });

    if (exist) {
      throw new ApiException('用户名已被注册', ApiCode.EXIST_ERROR, 200);
    }

    const user = await this.userReposition.create({
      ...userDto,
    });
    const result = await this.userReposition.save(user);
    if (result) {
      //  插入成功
      return true;
    } else {
      throw new ApiException('注册失败', ApiCode.BUSINESS_ERROR, 200);
    }
  }
}
