import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

/**
 * 权限列表
 */

@Entity({
  name: 'permissions',
})
export class PermissionsEntity {
  @PrimaryGeneratedColumn({ name: 'permission_id', comment: '权限id（自增）' })
  permissionId: number;

  @Column({
    name: 'permission_code',
    comment: '角色名称',
  })
  permissionCode: string;

  @Column({
    name: 'permission_name',
    comment: '显示名称',
  })
  permissionName: string;

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
