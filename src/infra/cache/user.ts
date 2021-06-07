import { ICache } from '@/core/ports/cache';
import { inject, injectable } from 'tsyringe';

@injectable()
export class UserCache {
  constructor(@inject('Cache') protected readonly cache: ICache) {}

  protected async getUserEmailAddress(id: number): Promise<string | null> {
    return this.cache.get(`users:${id}:emailAddress`);
  }

  protected async setUserEmailAddress(
    id: number,
    emailAddress: string
  ): Promise<void> {
    return this.cache.setWithExpirationTime(
      `users:${id}:emailAddress`,
      emailAddress,
      36000
    );
  }
}
