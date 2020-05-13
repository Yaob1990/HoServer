import {
  Controller,
  Headers,
  HttpCode,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

@Controller()
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('upload')
  @HttpCode(200)
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile() file,
    @Query('category') category: string,
    @Headers('userName') userName: string,
  ) {
    console.log(file);
    const filePath = file.path.replace(/\\/g, '/');
    return this.uploadService.saveAvatar(filePath, userName);
  }
}
