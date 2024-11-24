import { AUTH_ERROR_CODE } from './auth';
import { COMMON_ERROR_CODE } from './common';
import { MENU_ERROR_CODE } from './menu';
import { PROFILE_ERROR_CODE } from './profile';
import { ROLE_ERROR_CODE } from './role';
import { USER_ERROR_CODE } from './user';
import { VERIFY_ERROR_CODE } from './verify';

export const ERROR_CODE = {
  ...COMMON_ERROR_CODE,
  ...ROLE_ERROR_CODE,
  ...USER_ERROR_CODE,
  ...MENU_ERROR_CODE,
  ...PROFILE_ERROR_CODE,
  ...AUTH_ERROR_CODE,
  ...VERIFY_ERROR_CODE
};
