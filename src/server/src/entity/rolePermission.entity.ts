import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

/**
 * 用户id-角色id
 */
@Entity({
  name: 'role_permission',
})
export class UserRolesEntity {
  @PrimaryGeneratedColumn({ name: 'role_permission_id', comment: '自增id' })
  rolePermissionId: number;

  @Column({
    name: 'role_id',
    comment: '角色id',
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
