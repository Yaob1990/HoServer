import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';
import { UserDto } from '../dto/userDto';
import { ApiException } from '../filters/api.exception';
import { ApiCode } from '../enums/api-code.enums';
import { UserRolesEntity } from '../entity/userRoles.entity';
import { RolePermissionEntity } from '../entity/rolePermission.entity';

export type User = any;

@Injectable()
export class UserService {
  // 注入数据库表
  constructor(
    @InjectRepository(UserEntity)
    private readonly userReposition: Repository<UserEntity>,
    @InjectRepository(UserRolesEntity)
    private readonly userRolesReposition: Repository<UserRolesEntity>,
    @InjectRepository(RolePermissionEntity)
    private readonly rolePermissionReposition: Repository<RolePermissionEntity>,
  ) {}

  async all() {
    const result = await this.userReposition.find({
      where: {
        userName: 'Yao',
      },
    });
    return result;
  }

  async findOne(userName): Promise<User | undefined> {
    return await this.userReposition.findOne({
      userName: userName,
    });
  }

  async findUserInfo(userName): Promise<User | undefined> {
    // find形式
    // let result = await this.userReposition.findOne({
    //   select: ['userId'],
    //   // relations: ['userRoles'],
    //   join: {
    //     alias: 'user',
    //     leftJoinAndSelect: {
    //       userRoles: 'user.role_id',
    //     },
    //   },
    //   where: { userName: userName },
    // });

    const result = await this.userReposition
      .createQueryBuilder('user')
      // .select(['user.userId', 'userRoles.userRoleId'])
      // 数据需要显性返回
      .leftJoinAndSelect('user.userRoles', 'userRoles')
      //返回佐连接的全部数据
      .leftJoinAndSelect('userRoles.roleList', 'roleList')
      .where('user.userName = :userName', { userName: userName })
      .getOne();
    if (result.avatar) {
      result.avatar = `http://localhost:3000/${result.avatar}`;
    }
    console.log(result);

    return result;
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

  async updateUserInfo(userInfo: any, userNameToken: string) {
    const { userName, password, ...other } = userInfo;
    // 防止刷接口，验证身份，只能修改自己的内容
    if (userNameToken === userName) {
      // 禁止修改用户名,前端没法修改，如果刷接口修改
      try {
        // 获取实体
        const user = await this.userReposition.findOne({ where: { userName } });
        // 合并实体
        let mergeData = {};
        // 更新密码
        if (password.trim()) {
          mergeData = await this.userReposition.merge(user, {
            ...other,
            password,
          });
        } else {
          mergeData = await this.userReposition.merge(user, {
            ...other,
          });
        }

        //  保存到数据库
        const result = await this.userReposition.save(mergeData);
        return result;
      } catch (error) {}
    } else {
      throw new ApiException(
        '用户名校验失败，请勿恶意请求',
        ApiCode.BUSINESS_ERROR,
        200,
      );
    }
  }

  async saveAvatar(filePath, userName) {
    const user = await this.userReposition.findOne({ where: { userName } });
    user.avatar = filePath;
    const result = await this.userReposition.save(user);
    if (result) {
      return { url: `http://localhost:3000/${filePath}` };
    } else {
      throw new ApiException('头像上传失败', ApiCode.BUSINESS_ERROR, 200);
    }
  }
}
