import { Knex } from 'knex';

export interface DBConnection {
  getConnection(): Knex;
}
