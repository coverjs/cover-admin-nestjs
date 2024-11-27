import { ApiProperty } from '@nestjs/swagger';

export class MergeUploadDto {
  @ApiProperty({ description: '文件名' })
  fileName: string;

  @ApiProperty({ description: 'hash值' })
  hash: string;
}
