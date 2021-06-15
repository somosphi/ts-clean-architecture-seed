"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Worker = void 0;
const logger_1 = require("@/logger");
const base_worker_1 = require("@/main/modules/worker/base-worker");
const list_users_1 = require("@/infra/cron-jobs/listUsers/list-users");
const fetch_users_1 = require("@/infra/cron-jobs/fetchUsers/fetch-users");
class Worker extends base_worker_1.BaseWorker {
    loadJobs() {
        return [list_users_1.ListUsersJob, fetch_users_1.FetchUsersJob];
    }
    start() {
        this.resolveJobs();
        logger_1.logger.info(`Worker started with ${this.jobs.length} job(s)`);
        this.jobs.forEach(job => {
            if (!job.running)
                job.start();
        });
    }
}
exports.Worker = Worker;
