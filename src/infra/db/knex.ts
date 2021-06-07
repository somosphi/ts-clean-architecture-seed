import knex from 'knex';
import { DBConnection } from './ports/dbconnection';
import { logger } from '@/logger';
const knexconfig = require('../../../knexfile.js');

export class KnexConnection implements DBConnection {
  getConnection(): knex {
    logger.info(`Knex started with success.`);
    return knex(knexconfig);
  }
}
