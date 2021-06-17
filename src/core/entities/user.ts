import { UserSources } from '@/core/enum';

export class User {
  public readonly id: string;

  public name: string;

  public username: string;

  public email_address: string;

  public source: UserSources;

  public created_at: Date;

  public updated_at: Date;

  constructor(props: Partial<User>) {
    Object.assign(this, props);
  }
}
