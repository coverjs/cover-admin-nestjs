import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  Body,
  Get,
  Query
} from '@nestjs/common';
import { UploadService } from './upload.service';
import {
  FileInterceptor,
  FilesInterceptor,
  FileFieldsInterceptor,
  AnyFilesInterceptor
} from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommonApiResponse } from '@/common/decorators/apiResponse';
import * as fs from 'fs';
import * as path from 'path';
import { MergeUploadDto } from './dto/upload.dto';
import { v4 as uuidv4 } from 'uuid';
import { sleep } from '@/utils/common';
import { getType } from 'mime';

const fileTypeRegex = new RegExp(`\/(${process.env.UPLOAD_ALLOWED_EXTENSIONS})$`);

@ApiTags('文件上传')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) { }

  @Post('/file')
  @ApiOperation({ summary: '单个文件上传接口示例-字段(file)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary'
        }
      }
    }
  })
  @CommonApiResponse({ type: 'string' })
  @UseInterceptors(FileInterceptor('file'))
  upload(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: +process.env.UPLOAD_MAX_SIZE * 1024 * 1024 }),
          new FileTypeValidator({ fileType: fileTypeRegex })
        ]
      })
    )
    file: Express.Multer.File
  ) {
    return this.uploadService.uploadFile(file);
  }

  @Post('/files')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary'
          }
        }
      }
    }
  })
  @ApiOperation({ summary: '上传多个文件的示例-字段(files)' })
  @CommonApiResponse({ type: 'string' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('files', 10))
  uploads(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: +process.env.UPLOAD_MAX_SIZE * 1024 * 1024 }),
          new FileTypeValidator({ fileType: fileTypeRegex })
        ]
      })
    )
    files: Array<Express.Multer.File>
  ) {
    return this.uploadService.uploadFiles(files);
  }

  @Post('/fields')
  @ApiOperation({ summary: '根据字段名上传文件示例' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        avatar: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary'
          }
        },
        background: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary'
          }
        }
      }
    }
  })
  @CommonApiResponse({ type: 'string' })
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'avatar', maxCount: 1 },
      { name: 'background', maxCount: 1 }
    ])
  )
  @ApiConsumes('multipart/form-data')
  uploadFieldsFiles(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: +process.env.UPLOAD_MAX_SIZE * 1024 * 1024 }),
          new FileTypeValidator({ fileType: fileTypeRegex })
        ]
      })
    )
    files: {
      avatar: Array<Express.Multer.File>;
      background: Array<Express.Multer.File>;
    }
  ) {
    return this.uploadService.uploadsFields(files);
  }

  @Post('/any-fields')
  @ApiOperation({ summary: '任意字段名上传文件示例' })
  @ApiBody({
    schema: {
      type: 'object',
      additionalProperties: {
        type: 'string'
      }
    }
  })
  @CommonApiResponse({ type: 'string' })
  @UseInterceptors(AnyFilesInterceptor())
  @ApiConsumes('multipart/form-data')
  uploadMultipleAnyFiles(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: +process.env.UPLOAD_MAX_SIZE * 1024 * 1024 }),
          new FileTypeValidator({ fileType: fileTypeRegex })
        ]
      })
    )
    files: Array<Express.Multer.File>
  ) {
    return this.uploadService.uploadFiles(files);
  }

  @Post('/chunks')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary'
          }
        }
      }
    }
  })
  @ApiOperation({ summary: '上传大文件(单文件)示例-分块上传' })
  @CommonApiResponse({ type: 'string', isPublic: true })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  async uploadChunksFiles(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: +process.env.UPLOAD_MAX_SIZE * 1024 * 1024 }),
          new FileTypeValidator({ fileType: 'application/octet-stream' })
        ]
      })
    )
    file: Express.Multer.File,
    @Body() body: MergeUploadDto
  ) {
    const { hash } = body;
    const { filename } = file;
    const chunkDir = 'src/uploads/chunks_' + hash;
    if (!fs.existsSync(chunkDir)) {
      fs.mkdirSync(chunkDir);
    }
    fs.cpSync(file.path, chunkDir + '/' + filename);
    await sleep(100);
    fs.rmSync(file.path);
    return '上传大文件示例';
  }
  @Get('merge')
  @ApiOperation({ summary: '合并分块文件' })
  @CommonApiResponse({ isPublic: true })
  async merge(@Query() query: MergeUploadDto) {
    const { hash, fileName } = query;
    const uniqueSuffix = `${Date.now()}-${uuidv4()}-${fileName}`;
    const fileDir = 'src/uploads/' + uniqueSuffix;
    const chunkDir = 'src/uploads/chunks_' + hash;
    // chunks文件夹下所有chunks文件
    const files = fs.readdirSync(chunkDir);
    let startPos = 0;
    files.map((file) => {
      const filePath = chunkDir + '/' + file;
      const stream = fs.createReadStream(filePath);
      stream.pipe(
        fs.createWriteStream(fileDir, {
          start: startPos
        })
      );

      startPos += fs.statSync(filePath).size;
    });
    await sleep(1000);
    const fileObj = {
      filename: path.basename(fileDir),
      size: fs.statSync(fileDir).size,
      mimetype: getType(fileDir),
      originalname: fileName
    };

    return this.uploadService.uploadFile(fileObj);
  }
}
