import * as fs from 'node:fs';
import * as path from 'node:path';
import process from 'node:process';
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import * as multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';

const uploadDir = path.join(
  process.cwd(),
  `/src/${process.env.STATIC_UPLOADS_DIRECTORY}`,
);

@Module({
  imports: [
    MulterModule.register({
      storage: multer.diskStorage({
        destination: (req, file, cb) => {
          try {
            if (!fs.existsSync(uploadDir)) {
              fs.mkdirSync(uploadDir);
            }
          }
          catch (e) {
            // eslint-disable-next-line no-console
            console.log('error', e);
          }
          cb(null, uploadDir);
        },
        filename: (req, file, cb) => {
          const uniqueSuffix = `${Date.now()}-${uuidv4()}-${file.originalname}`;
          cb(null, uniqueSuffix);
        },
      }),
    }),
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
