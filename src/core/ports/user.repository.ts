import { User } from '@/core/entities/user';
import { Transaction } from 'knex';
import { UserSources } from '../enum';

export interface IUserRepository {
  all(): Promise<User[]>;
  getById(id: string): Promise<User | null>;
  transaction: any;
  create(data: Partial<User>, trx?: Transaction): Promise<string>;
  getByEmailsWithSource(
    emails: string[],
    source: UserSources,
    trx?: Transaction
  ): Promise<User[]>;
}
