import { Cache } from '@/infra/cache/cache';

export class UserCache extends Cache {
  protected async getUserEmailAddress(id: number): Promise<string | null> {
    return this.get(`users:${id}:emailAddress`);
  }

  protected async setUserEmailAddress(
    id: number,
    emailAddress: string
  ): Promise<'OK' | null> {
    return this.setWithExpirationTime(`users:${id}:emailAddress`, emailAddress);
  }
}
