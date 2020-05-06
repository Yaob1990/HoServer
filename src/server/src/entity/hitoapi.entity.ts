import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Hitoapi {
  @PrimaryGeneratedColumn({comment: '自增id',})
  id: number;

  @Column({
    comment: '原始id',
  })
  origin_id:string

  @Column({
    comment: '来源',
  })
  cat_name:string

  @Column({
    comment: '内容',
  })
  text:string

  @Column({
    comment: '作者',
  })
  author:string
  @Column({
    comment: '来源',
  })
  source:string

  @Column({
    comment: '时间',
  })
  date:string

  @Column({
    comment: '审核状态',
    // 未审核：0，已审核1
    default:0
  })
  audit:number

  @CreateDateColumn({type: "datetime",comment: '爬取时间',})
  created_at: Date;

}
