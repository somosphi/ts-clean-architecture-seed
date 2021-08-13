import Knex, { Transaction } from 'knex';
import { injectable, inject } from 'tsyringe';
import { IUserRepository } from '@/core/ports/user.repository';
import { User } from '@/core/entities/user';
import { UserSources } from '@/core/enum';
import { Repository } from './repository';
import { table } from './repository.config';

@injectable()
@table('users')
export class UserRepository extends Repository<User>
  implements IUserRepository {

  protected properties = [
    'id',
    'name',
    'username',
    'emailAdress',
    'source',
    'createdAt',
    'updatedAt',
  ];

  constructor(@inject('mysqlDatabase') protected database: Knex) {
    super();
  }

  async getByEmailsWithSource(
    emails: string[],
    source: UserSources,
    trx?: Transaction
  ): Promise<User[]> {
    return this.transactionable(trx)
      .whereIn('emailAddress', emails)
      .where('source', source);
  }

  async getByUsername(username: string): Promise<User | null> {
    return this.transactionable()
      .where('username', username)
      .first();
  }
}
