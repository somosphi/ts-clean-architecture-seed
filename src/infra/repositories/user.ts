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
    'name',
    'email_address',
    'source',
    'created_at',
    'updated_at',
  ];

  constructor(@inject('mysql_database') protected database: Knex) {
    super();
  }

  async getByEmailsWithSource(
    emails: string[],
    source: UserSources,
    trx?: Transaction
  ): Promise<User[]> {
    return this.transactionable(trx)
      .whereIn('email_address', emails)
      .where('source', source);
  }
}
