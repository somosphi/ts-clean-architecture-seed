"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatorMiddleware = void 0;
const errors_1 = require("../errors");
const logger_1 = require("../../../logger");
const validatorMiddleware = (schema) => (req, res, next) => {
    const validation = schema.validate(req, {
        abortEarly: false,
        stripUnknown: true,
        allowUnknown: true,
    });
    if (validation.error) {
        logger_1.logger.info(req?.body);
        logger_1.logger.info(req?.params);
        logger_1.logger.info(req?.query);
        return next(new errors_1.BadRequest('VALIDATION_FAILED', 'Invalid request data', validation.error.details));
    }
    Object.assign(req, validation.value);
    return next();
};
exports.validatorMiddleware = validatorMiddleware;
