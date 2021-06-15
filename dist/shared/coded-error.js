"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodedError = void 0;
class CodedError extends Error {
    constructor(code, message, details) {
        super(message);
        this.code = code;
        this.details = details;
    }
    toJSON() {
        return {
            message: this.message,
            code: this.code,
            details: this.details,
        };
    }
}
exports.CodedError = CodedError;
