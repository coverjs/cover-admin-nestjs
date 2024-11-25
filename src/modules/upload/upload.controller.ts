import { Controller, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { UploadService } from './upload.service';
import {
  FileInterceptor,
  FilesInterceptor,
  FileFieldsInterceptor,
  AnyFilesInterceptor
} from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommonApiResponse } from '@/common/decorators/apiResponse';

@ApiTags('文件上传')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

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
  upload(@UploadedFile() file: Express.Multer.File) {
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
  uploads(@UploadedFiles() files: Array<Express.Multer.File>) {
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
  uploadMultipleFiles(
    @UploadedFiles() files: { avatar: Array<Express.Multer.File>; background: Array<Express.Multer.File> }
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
  uploadMultipleAnyFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
    return this.uploadService.uploadFiles(files);
  }
}
