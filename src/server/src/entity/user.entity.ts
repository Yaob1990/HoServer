import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'user',
})
export class UserEntity {
  @PrimaryGeneratedColumn({ comment: '用户自增id' })
  id: number;

  @Column({
    name: 'user_name',
    comment: '用户名',
  })
  userName: string;

  @Column({
    comment: '密码',
  })
  password: string;

  @Column({
    name: 'is_admin',
    comment: '是否是管理员',
    default: false,
  })
  isAdmin: boolean;

  @Column({
    name: 'is_active',
    comment: '账户激活状态',
    default: false,
  })
  isActive: boolean;

  @Column({
    name: 'real_name',
    comment: '真实姓名',
  })
  realName: string;

  @Column({
    name: 'nick_name',
    comment: '昵称',
    default: '新用户',
  })
  nickName: string;

  @Column({
    comment: '头像',
    default: 'avatar',
  })
  avatar: string;

  @Column({
    comment: '性别',
    default: 'male',
  })
  gender: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'datetime',
    comment: '创建时间',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'datetime',
    comment: '更新时间',
  })
  updatedAt: Date;
}
