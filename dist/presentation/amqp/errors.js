"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = void 0;
const coded_error_1 = require("@/shared/coded-error");
class ValidationError extends coded_error_1.CodedError {
    constructor(details) {
        super('VALIDATION_FAILED', 'Invalid request data', details);
    }
}
exports.ValidationError = ValidationError;
