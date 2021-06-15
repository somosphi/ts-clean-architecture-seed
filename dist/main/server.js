"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
require("module-alias/register");
const app_1 = require("@/main/app");
const logger_1 = require("@/logger");
const application = new app_1.Application();
setImmediate(async () => {
    try {
        await application.start();
        logger_1.logger.info('Application started');
    }
    catch (err) {
        if (err.length && err[0] instanceof class_validator_1.ValidationError) {
            application.throwEnvValidatorErrors(err);
        }
        throw err;
    }
});
