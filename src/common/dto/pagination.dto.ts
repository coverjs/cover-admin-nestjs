import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @Type()
  @IsNumber()
  @ApiProperty({ description: '当前页码', example: 1, required: false, minimum: 1 })
  pageNum?: number;

  @IsOptional()
  @Type()
  @IsNumber()
  @ApiProperty({ description: '每页条数', example: 10, required: false, minimum: 1 })
  pageSize?: number;

  // /* 排序字段 */
  // @IsOptional()
  // @Type()
  // @IsString()
  // public orderByColumn?: string;

  // /* 排序方式 */
  // @IsOptional()
  // @Type()
  // @IsString()
  // public isAsc?: string;

  /* mysql忽略条数 */
  skip?: number;

  /* mysql返回条数 */
  take?: number;
}
