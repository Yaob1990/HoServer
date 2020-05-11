import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entity/user.entity';
import { AuthModule } from '../auth/auth.module';
import { RolesEntity } from '../entity/roles.entity';
import { UserRolesEntity } from '../entity/userRoles.entity';
import { RolePermissionEntity } from '../entity/rolePermission.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      RolesEntity,
      UserRolesEntity,
      RolePermissionEntity,
    ]),
    // 解决循环导入的问题
    forwardRef(() => AuthModule),
  ],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
