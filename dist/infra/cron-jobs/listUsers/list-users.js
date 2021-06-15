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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListUsersJob = void 0;
const tsyringe_1 = require("tsyringe");
const logger_1 = require("@/logger");
const cron_job_1 = require("@/infra/cron-jobs/cron-job");
let ListUsersJob = class ListUsersJob extends cron_job_1.CronJob {
    constructor(listUsersUseCase) {
        super('*/5 * * * *');
        this.listUsersUseCase = listUsersUseCase;
        this.name = 'List Users Job';
    }
    async runTask() {
        const users = await this.listUsersUseCase.list();
        for (const user of users) {
            logger_1.logger.info(`(${user.id}) ${user.name}`);
        }
    }
};
ListUsersJob = __decorate([
    tsyringe_1.singleton(),
    __param(0, tsyringe_1.inject('ListUsersUseCase')),
    __metadata("design:paramtypes", [Object])
], ListUsersJob);
exports.ListUsersJob = ListUsersJob;
