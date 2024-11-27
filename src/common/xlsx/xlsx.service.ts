import { Buffer } from 'node:buffer';
import { Injectable } from '@nestjs/common';
import xlsx from 'node-xlsx';

@Injectable()
export class XlsxService {
  constructor() { }
  /**
   * 导出excel
   * @param titleList 标题
   * @param dataList 数据
   * @param xlsName sheet的名称
   */
  public exportExcel(titleList: Array<string>, dataList: string[][], xlsName = 'sheet1'): ArrayBuffer {
    const data = [titleList, ...dataList]; // 其实最后就是把这个数组写入excel
    const buffer = xlsx.build([{ name: xlsName, data, options: {} }]);
    return Buffer.from(buffer);
  }
}
