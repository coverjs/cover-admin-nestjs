import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import * as multer from 'multer';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

const uploadDir = path.join(process.cwd(), `/src/${process.env.STATIC_UPLOADS_DIRECTORY}`);

@Module({
  imports: [
    MulterModule.register({
      storage: multer.diskStorage({
        destination: (req, file, cb) => {
          try {
            if (!fs.existsSync(uploadDir)) {
              fs.mkdirSync(uploadDir);
            }
          } catch (e) {
            console.log(e);
          }
          cb(null, uploadDir);
        },
        filename: (req, file, cb) => {
          const uniqueSuffix = `${Date.now()}-${uuidv4()}-${file.originalname}`;
          cb(null, uniqueSuffix);
        }
      })
    })
  ],
  controllers: [UploadController],
  providers: [UploadService]
})
export class UploadModule {}
