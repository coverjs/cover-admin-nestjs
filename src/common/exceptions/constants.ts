import { Path, TranslateOptions } from 'nestjs-i18n';
import { I18nTranslations } from '../types/i18n';

export interface BusinessError {
  code: number
  msg: Path<I18nTranslations>
  options?: TranslateOptions
}

