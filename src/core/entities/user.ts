import { UserSources } from '@/core/enum';

export class User {
  public readonly id: string;

  public name: string;

  public username: string;

  public emailAddress: string;

  public source: UserSources;

  public createdAt: Date;

  public updatedAt: Date;

  constructor(props: Partial<User>) {
    Object.assign(this, props);
  }
}
