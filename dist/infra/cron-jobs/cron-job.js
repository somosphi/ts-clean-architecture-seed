"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CronJob = void 0;
const cron_1 = require("cron");
const logger_1 = require("../../logger");
class CronJob extends cron_1.CronJob {
    constructor(cronTime, timezone = 'Etc/UTC') {
        super(cronTime, () => this.execute(), null, false, timezone);
        this.name = 'Worker Cron Job';
        this.running = false;
    }
    async errorHandler(err) {
        logger_1.logger.error(err);
    }
    async execute() {
        try {
            logger_1.logger.info(`${this.name} has started`);
            await this.runTask();
        }
        catch (err) {
            try {
                await this.errorHandler(err);
            }
            catch (error) {
                logger_1.logger.error(error);
            }
        }
        finally {
            logger_1.logger.info(`${this.name} has finished`);
        }
    }
}
exports.CronJob = CronJob;
