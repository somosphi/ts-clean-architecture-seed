"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const knex_1 = __importDefault(require("knex"));
const tsyringe_1 = require("tsyringe");
const repository_1 = require("./repository");
const repository_config_1 = require("./repository.config");
let UserRepository = class UserRepository extends repository_1.Repository {
    constructor(database) {
        super();
        this.database = database;
    }
    async getByEmailsWithSource(emails, source, trx) {
        return this.transactionable(trx)
            .whereIn('emailAddress', emails)
            .where('source', source);
    }
};
UserRepository = __decorate([
    tsyringe_1.injectable(),
    repository_config_1.table('users'),
    __param(0, tsyringe_1.inject('mysqlDatabase')),
    __metadata("design:paramtypes", [Function])
], UserRepository);
exports.UserRepository = UserRepository;
