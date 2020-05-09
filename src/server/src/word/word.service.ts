import { HttpService, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Word } from '../entity/word.entity';
import { Repository } from 'typeorm';
import { WordDto } from '../dto/wordDto';
import { ApiException } from '../filters/api.exception';
import { ApiCode } from '../enums/api-code.enums';
import { Hitoapi } from '../entity/hitoapi.entity';

@Injectable()
export class WordService {
  // 注入数据库表
  constructor(
    @InjectRepository(Word) private readonly wordReposition: Repository<Word>,
    @InjectRepository(Hitoapi)
    private readonly HitoApiReposition: Repository<Hitoapi>,
    private httpService: HttpService,
  ) {}
  async add(body: WordDto) {
    // 查找是否存在
    const result = await this.wordReposition.find({ word: body.word });
    if (result.length > 0) {
      throw new ApiException('资源已经存在', ApiCode.EXIST_ERROR, 200);
    }

    const newWord = await this.wordReposition.create({
      ...body,
    });
    console.log('newWord');
    const newResult = await this.wordReposition.save(newWord);
    if (newResult) {
      //  插入成功
      return true;
    } else {
      throw new ApiException('添加失败', ApiCode.BUSINESS_ERROR, 200);
    }
  }
  // 获取已经审核的数据
  async getAll() {
    const result = await this.wordReposition.find({
      select: ['word', 'from', 'source'],
      where: { audit: 1 },
    });
    return result;
  }
  // 获取未审核的数据
  async needAudit(pageSize: number, pageNumber: number) {
    const [data, count] = await this.wordReposition
      .createQueryBuilder()
      .skip((pageNumber - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();
    return {
      list: data,
      totalCount: count,
    };
  }

  // 修改审核状态
  async setAudit(id: number, status: 0 | 1) {
    // 找到一条记录
    const data = await this.wordReposition.findOne(id);
    // const update = await this.wordReposition.merge(old,{
    //   audit:status
    // })
    // 修改记录属性（值）
    data.audit = status;
    // 保存，写入数据库
    const result = await this.wordReposition.save(data);
    if (result) {
      return '';
    } else {
      throw new ApiException('写入失败', ApiCode.BUSINESS_ERROR, 200);
    }
  }

  async getData() {
    debugger;
    const { data } = await this.httpService
      .get('https://hitoapi.cc/sp')
      .toPromise();
    if (data) {
      const HitoapiData = {
        origin_id: data.id,
        cat_name: data.catname,
        text: data.text,
        author: data.author,
        source: data.source,
        date: data.date,
      };
      // 查找是否存在
      const result = await this.HitoApiReposition.find({
        text: HitoapiData.text,
      });
      if (result.length > 0) {
        console.log('资源已经存在，跳过存储');
        await this.getData();
      } else {
        const newHitoapiData = await this.HitoApiReposition.create(HitoapiData);
        const newResult = await this.HitoApiReposition.save(newHitoapiData);
        console.log(HitoapiData.text);
        await this.getData();
      }
    }

    return 123;

    // await this.getData()
  }
}
