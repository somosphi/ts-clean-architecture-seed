import knex from 'knex';
import { logger } from '@/logger';
import { DBConnection } from './ports/dbconnection';

const knexconfig = require('../../../knexfile.js');

export class KnexConnection implements DBConnection {
  getConnection(): knex {
    logger.info(`Knex started with success.`);
    return knex(knexconfig);
  }
}
