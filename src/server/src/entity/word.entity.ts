import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Word {
  @PrimaryGeneratedColumn({comment: '自增id',})
  id: number;

  @Column({
    comment: '句子',
  })
  word:string

  @Column({
    comment: '来源',
  })
  from:string

  @Column({
    comment: '原始地址',
    default:''
  })
  source:string

  @Column({
    comment: '审核状态',
    // 未审核：0，已审核1
    default:0
  })
  audit:number

  @CreateDateColumn({type: "datetime",comment: '时间',})
  createdAt: Date;

}
