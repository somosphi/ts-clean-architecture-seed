"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlerMiddleware = void 0;
const logger_1 = require("@/logger");
const errors_1 = require("../errors");
const errorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof errors_1.HttpError) {
        logger_1.logger.error(err);
        const { statusCode, message, code, details } = err;
        res.status(statusCode || 200).send({
            code,
            message,
            details,
        });
        return next();
    }
    if (err.code && err.code === 'ER_DUP_ENTRY') {
        res.status(409).send({
            code: 'DUPLICATED_RESOURCE',
            message: 'Duplicated resource',
        });
        return next();
    }
    res.status(500).send({
        code: 'UNEXPECTED_ERROR',
        message: 'Internal server failure',
    });
    return next();
};
exports.errorHandlerMiddleware = errorHandlerMiddleware;
