import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

/**
 * 角色列表
 */

@Entity({
  name: 'roles',
})
export class RolesEntity {
  @PrimaryGeneratedColumn({ name: 'role_id', comment: '用户自增id' })
  roleId: number;

  @Column({
    name: 'name',
    comment: '角色名称',
  })
  roleName: string;

  @Column({
    name: 'dis_name',
    comment: '显示名称',
  })
  disName: string;

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
