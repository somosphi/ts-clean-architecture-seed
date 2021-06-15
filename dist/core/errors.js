"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserNotFoundError = void 0;
const coded_error_1 = require("@/shared/coded-error");
class UserNotFoundError extends coded_error_1.CodedError {
    constructor() {
        super('USER_NOT_FOUND', 'User not found.');
    }
}
exports.UserNotFoundError = UserNotFoundError;
