import { injectable } from 'tsyringe';
import Redis from 'ioredis';
import { Module } from '@/main/modules/modules';
import { logger } from '@/logger';
import { env } from '@/main/env';

@injectable()
export class CacheClient implements Module {
  protected redisClient: Redis.Redis;

  async start(): Promise<void> {
    logger.info(`Started cache client`);
    this.redisClient = new Redis({
      port: env.redisPort,
      host: env.redisHost,
    });
  }
}
