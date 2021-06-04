import { Redis } from 'ioredis';
import { inject } from 'tsyringe';

export abstract class Cache {
  constructor(@inject('redisClient') protected readonly cache: Redis) {}

  get(key: string) {
    return this.cache.get(key);
  }

  set(key: string, value: any) {
    return this.cache.set(key, value);
  }

  setWithExpirationTime(key: string, value: any): Promise<'OK' | null> {
    return this.cache.set(key, value, 'EX', 36000);
  }
}
