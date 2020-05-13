import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as dayjs from 'dayjs';
import * as nuid from 'nuid';
import { checkDirAndCreate } from './utils/utils';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { ApiCode } from '../../enums/api-code.enums';
import { ApiException } from '../../filters/api.exception';
import { UserModule } from '../../user/user.module';

const image = ['gif', 'png', 'jpg', 'jpeg', 'bmp', 'webp'];
const video = ['mp4', 'webm'];
const audio = ['mp3', 'wav', 'ogg'];

function tempType(mimeType) {
  let temp = 'other';
  image.filter(item => item === mimeType).length > 0 ? (temp = 'image') : '';
  video.filter(item => item === mimeType).length > 0 ? (temp = 'video') : '';
  audio.filter(item => item === mimeType).length > 0 ? (temp = 'audio') : '';
  return temp;
}

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        // 配置文件上传后的文件夹路径
        destination: (req, file, cb) => {
          // 根据上传的文件类型将图片视频音频和其他类型文件分别存到对应英文文件夹
          // 获取类型
          const category = req.query.category || 'other';
          const mimeType = file.mimetype.split('/')[1];
          const temp = tempType(mimeType);

          const filePath = `public/uploads/${category}/${temp}/${dayjs().format(
            'YYYY-MM-DD',
          )}`;
          checkDirAndCreate(filePath); // 判断文件夹是否存在，不存在则自动生成
          return cb(null, `./${filePath}`);
        },
        filename: (req, file, cb) => {
          // 在此处自定义保存后的文件名称(修改原始对象)
          const fileType = file.originalname.split('.');
          const filename = `${nuid.next()}.${fileType[fileType.length - 1]}`;
          return cb(null, filename);
        },
      }),
      fileFilter(req, file, cb) {
        const mimeType = file.mimetype.split('/')[1].toLowerCase();
        const temp = tempType(mimeType);
        if (temp === 'other') {
          return cb(
            new ApiException('文件类型错误', ApiCode.FILE_TYPE_ERROR, 200),
            false,
          );
        }
        return cb(null, true);
      },
    }),
    UserModule,
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
