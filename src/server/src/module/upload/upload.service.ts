import { Injectable } from '@nestjs/common';
import { UserService } from '../../user/user.service';

@Injectable()
export class UploadService {
  constructor(private readonly usersService: UserService) {}
  saveAvatar(filePath, userName) {
    return this.usersService.saveAvatar(filePath, userName);
  }
}
