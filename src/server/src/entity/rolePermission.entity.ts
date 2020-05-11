import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRolesEntity } from './userRoles.entity';

/**
 * 角色->权限点
 */
@Entity({
  name: 'role_permission',
})
export class RolePermissionEntity {
  @PrimaryGeneratedColumn({ name: 'role_permission_id', comment: '自增id' })
  rolePermissionId: number;

  @ManyToOne(
    type => UserRolesEntity,
    userRoles => userRoles.roleId,
  )
  @JoinColumn({
    name: 'role_id',
  })
  roleId: number;

  @Column({
    name: 'permission_id',
    comment: '权限点id',
  })
  permissionId: number;

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
