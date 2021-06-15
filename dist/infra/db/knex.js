"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KnexConnection = void 0;
const knex_1 = __importDefault(require("knex"));
const logger_1 = require("@/logger");
const knexconfig = require('../../../knexfile.js');
class KnexConnection {
    getConnection() {
        logger_1.logger.info(`Knex started with success.`);
        return knex_1.default(knexconfig);
    }
}
exports.KnexConnection = KnexConnection;
