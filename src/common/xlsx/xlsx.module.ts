import { Global, Module } from '@nestjs/common';
import { XlsxService } from './xlsx.service';

@Global()
@Module({
  providers: [XlsxService],
  exports: [XlsxService]
})
export class XlsxModule {}
