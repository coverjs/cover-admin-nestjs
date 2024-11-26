import { Injectable, PipeTransform } from '@nestjs/common';
import { PaginationDto } from '../dto/pagination.dto';

@Injectable()
export class PaginationPipe implements PipeTransform {
  transform(data: PaginationDto) {
    // eslint-disable-next-line no-undefined
    data.skip = data.pageNum ? (data.pageNum - 1) * data.pageSize : undefined;
    // eslint-disable-next-line no-undefined
    data.take = data.pageSize ? +data.pageSize : undefined;
    return data;
  }
}
