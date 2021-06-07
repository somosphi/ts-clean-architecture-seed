import { Knex, knex } from 'knex';
import { DBConnection } from './ports/dbconnection';
import { logger } from '@/logger';
const knexconfig = require('../../../knexfile.js');

export class KnexConnection implements DBConnection {
  getConnection(): Knex {
    logger.info(`Knex started with success.`);
    return knex(knexconfig);
  }
}
