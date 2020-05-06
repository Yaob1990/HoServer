import { Module,HttpModule } from '@nestjs/common';
import { WordService } from './word.service';
import { WordController } from './word.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Word } from '../entity/word.entity'
import { Hitoapi } from '../entity/hitoapi.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Word,Hitoapi]),HttpModule],
  providers: [WordService],
  controllers: [WordController]
})
export class WordModule {}
