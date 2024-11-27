import { Injectable } from '@nestjs/common';
import Config from '../../../config/index';

@Injectable()
export class UploadService {
  uploadFile(file: Partial<Express.Multer.File>) {
    return {
      fileName: file.filename,
      url: `${Config.staticDomain}:${process.env.PORT}/${process.env.STATIC_UPLOADS_PREFIX}/${file.filename}`,
      size: file.size,
      type: file.mimetype,
      originalname: file.originalname
    };
  }

  uploadFiles(files: Array<Express.Multer.File>) {
    return files.map((file) => {
      return this.uploadFile(file);
    });
  }

  uploadsFields(files: Record<string, Array<Express.Multer.File>>) {
    return Object.keys(files).reduce((acc, key) => {
      acc[key] = this.uploadFiles(files[key]);
      return acc;
    }, {});
  }
}
