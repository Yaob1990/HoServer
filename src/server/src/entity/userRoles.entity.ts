import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { RolePermissionEntity } from './rolePermission.entity';

/**
 * 用户id->角色id
 */
@Entity({
  name: 'user_roles',
})
export class UserRolesEntity {
  @PrimaryGeneratedColumn({ name: 'user_role_id', comment: '自增id' })
  userRoleId: number;

  @ManyToOne(
    type => UserEntity,
    user => user.userRoles,
  )
  @JoinColumn({
    name: 'user_id',
  })
  userId: number;

  @Column({
    name: 'role_id',
    comment: '角色id',
  })
  roleId: number;

  @OneToMany(
    type => RolePermissionEntity,
    rolePermission => rolePermission.roleId,
  )
  roleList: RolePermissionEntity[];

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
