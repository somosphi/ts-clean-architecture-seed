import knex from 'knex';
import { logger } from '@/logger';
import { DBConnection } from '@/infra/db/ports/dbconnection';

const knex_config = require('../../../knexfile.js');

export class KnexConnection implements DBConnection {
  getConnection(): knex {
    logger.info(`Knex started with success.`);
    return knex(knex_config);
  }
}
