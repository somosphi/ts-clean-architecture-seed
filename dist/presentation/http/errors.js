"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = exports.BadRequest = exports.HttpError = void 0;
const coded_error_1 = require("@/shared/coded-error");
class HttpError extends coded_error_1.CodedError {
    constructor(code, message, statusCode, details) {
        super(code, message, details);
        this.statusCode = statusCode;
    }
}
exports.HttpError = HttpError;
class BadRequest extends HttpError {
    constructor(code, message, details) {
        super(code, message, 400, details);
    }
}
exports.BadRequest = BadRequest;
class NotFoundError extends HttpError {
    constructor() {
        super('NOT_FOUND', 'Page not found', 404);
    }
}
exports.NotFoundError = NotFoundError;
