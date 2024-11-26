import { BusinessException } from '@/common/exceptions';
import { ERROR_CODE } from '@/common/error-codes';

export const isDev = () => {
  return process.env.NODE_ENV === 'development';
};

/**
 * 解析cookie
 * @param cookies 所有cookie
 * @param key 要解析的key
 * @returns cookie值
 * @throws BusinessException 如果缺失cookie则抛出异常
 */
export function parseCookie<T = any>(cookies: string, key: string): T {
  const cookie = Object.fromEntries(cookies.split(';').map((cookie) => cookie.trim().split('=')))[key];
  if (!cookie) {
    throw new BusinessException(ERROR_CODE.MISSING_COOKIE);
  }
  return cookie as T;
}

/**
 * 检查redis事务执行结果
 * @param results 执行结果
 */
export function checkRedisTransactionStatus(results: [error: Error | null, result: unknown][] | null) {
  for (const [err, result] of results) {
    if (err || result !== 'OK') {
      throw new BusinessException(ERROR_CODE.REDIS_TX_FAIL);
    }
  }
}
