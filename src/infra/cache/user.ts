import { inject, injectable } from 'tsyringe';
import { IUserCache } from '@/core/ports/user.cache';
import { Cache } from '@/infra/cache/ports/cache';

@injectable()
export class UserCache implements IUserCache {
  constructor(@inject('Cache') protected readonly cache: Cache) {}

  async getUserEmailAddress(id: number): Promise<string | null> {
    return this.cache.get(`users:${id}:emailAddress`);
  }

  async setUserEmailAddress(id: number, emailAddress: string): Promise<void> {
    return this.cache.setWithExpirationTime(
      `users:${id}:emailAddress`,
      emailAddress,
      36000
    );
  }
}
