import knex from 'knex';
import { DBConnection } from './ports/dbconnection';

const knexconfig = require('../../../knexfile.js');

export class KnexConnection implements DBConnection {
  getConnection(): knex {
    return knex(knexconfig);
  }
}
