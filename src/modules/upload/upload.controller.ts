import { Controller, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor, FilesInterceptor, FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommonApiResponse } from '@/common/decorators/apiResponse';

@ApiTags('文件上传')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('/file')
  @ApiOperation({ summary: '单个文件上传接口示例' })
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
    return this.uploadService.upload(file);
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
  @ApiOperation({ summary: '上传多个文件的示例' })
  @CommonApiResponse({ type: 'string' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('files'))
  uploads(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log(files);
    return '待开发';
  }

  @Post('/fields')
  @ApiOperation({ summary: '根据字段名上传文件示例' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        avatar: {
          type: 'string',
          format: 'binary'
        },
        background: {
          type: 'string',
          format: 'binary'
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
  uploadMultipleFiles(@UploadedFiles() files: Express.Multer.File[]) {
    console.log(files);
    return '待开发';
  }
}
