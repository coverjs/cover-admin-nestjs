import { filterValue } from '@/utils/format';
import { Injectable, PipeTransform } from '@nestjs/common';
import { PaginationDto } from '../dto/pagination.dto';

@Injectable()
export class PaginationPipe implements PipeTransform {
  transform(data: PaginationDto) {
    const pageNum = data.pageNum || 1;
    const pageSize = data.pageSize || 10;
    data.skip = (+pageNum - 1) * pageSize;
    data.take = +pageSize;
    return filterValue(data, '');
  }
}
