import { UserSources } from '@/core/enum';
import { Entity } from '@/core/entities/entity.config';

export class User extends Entity<User> {
  public readonly id: string;

  public name: string;

  public username: string;

  public emailAddress: string;

  public source: UserSources;

  public createdAt: Date;

  public updatedAt: Date;

  constructor(props: Partial<User>) {
    super();
    this.validate(props);
    const { createdAt, updatedAt } = props;
    Object.assign(this, props);

    if (createdAt) {
      this.createdAt = new Date(createdAt);
    }

    if (updatedAt) {
      this.updatedAt = new Date(updatedAt);
    }
  }

  protected validate(props: Partial<User>): void {}
}
