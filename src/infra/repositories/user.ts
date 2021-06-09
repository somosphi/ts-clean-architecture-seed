import Knex, { Transaction } from 'knex';
import { IUserRepository } from '@/core/ports/user.repository';
import { User } from '@/core/entities/user';
import { Repository } from './repository';
import { UserSources } from '@/core/enum';
import { injectable, inject } from 'tsyringe';
import { table } from './repository.config';

@injectable()
@table('users')
export class UserRepository
  extends Repository<User>
  implements IUserRepository {
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
}
