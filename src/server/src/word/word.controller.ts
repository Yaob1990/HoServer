import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Post, UsePipes } from '@nestjs/common';
import { WordDto } from '../dto/wordDto';
import { ValidationPipe } from '../pipe/validation.pipe';
import { WordService } from './word.service';

@Controller('word')
export class WordController {
  constructor(private readonly wordService:WordService) {
  }
  @Get("all")
  async all() {
    return await this.wordService.getAll()
  }

  @Get("audit")
  async audit() {
    // return await this.wordService.needAudit(2,2)
    return await this.wordService.setAudit(3,1)

  }

  @Post()
  // 参数校验
  @UsePipes(ValidationPipe)
  @HttpCode(200)
  async add(@Body() body: WordDto) {
  return   await this.wordService.add(body)
  }

  @Get('more')
  async more(){
    return   await this.wordService.getData()
  }
}
