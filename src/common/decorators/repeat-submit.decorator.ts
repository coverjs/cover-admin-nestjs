import { SetMetadata } from '@nestjs/common';
import { REOEATSUBMIT_METADATA } from '../constants';

export class RepeatSubmitOption {
  interval?: number = 1; // 默认1s
  message?: string = '操作过于频繁';
}

export function RepeatSubmit(option?: RepeatSubmitOption) {
  const repeatSubmitOption = Object.assign(new RepeatSubmitOption(), option);
  return SetMetadata(REOEATSUBMIT_METADATA, repeatSubmitOption);
}
