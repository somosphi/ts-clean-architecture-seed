import knex from 'knex';

export interface DBConnection {
  getConnection(): knex;
}
