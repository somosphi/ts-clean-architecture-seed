import { ICache } from '@/core/ports/cache';
import { Redis } from 'ioredis';
import { inject, injectable } from 'tsyringe';

@injectable()
export class Cache implements ICache {
  constructor(@inject('redisClient') protected readonly cache: Redis) {}

  get(key: string): Promise<string | null> {
    return this.cache.get(key);
  }

  async set(key: string, value: any): Promise<void> {
    await this.cache.set(key, value);
  }

  async setWithExpirationTime(
    key: string,
    value: any,
    expirationTime: number
  ): Promise<void> {
    await this.cache.set(key, value, 'EX', expirationTime);
  }
}
