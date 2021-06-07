import { Module } from './modules';
import { logger } from '@/logger';
import Redis from 'ioredis';
import { env } from '../env';
import { injectable } from 'tsyringe';

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
