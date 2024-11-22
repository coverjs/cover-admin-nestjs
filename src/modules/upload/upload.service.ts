import { Injectable } from '@nestjs/common';
import Config from '../../../config/index';

@Injectable()
export class UploadService {
  upload(file: Express.Multer.File) {
    console.log(file, 'file');
    return {
      fileName: file.filename,
      url: `${Config.staticDomain}:${process.env.PORT}/${process.env.STATIC_UPLOADS_PREFIX}/${file.filename}`,
      size: file.size,
      type: file.mimetype,
      originalname: file.originalname
    };
  }

  findAll() {
    return `This action returns all upload`;
  }

  findOne(id: number) {
    return `This action returns a #${id} upload`;
  }

  update(id: number) {
    return `This action updates a #${id} upload`;
  }

  remove(id: number) {
    return `This action removes a #${id} upload`;
  }
}
