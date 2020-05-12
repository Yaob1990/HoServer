import { Controller, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class UploadController {
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file, @Query('category') category: string): any {
    console.log(category);
    file.path = file.path.replace(/\\/g, '/'); // 转换正反斜线，转换结果如： `"path": "public/uploads/image/2020-04-08/V0QYQ0VN3GH6ASHXCGC901.jpg",`
    console.log(file);
    return true;
  }
}
