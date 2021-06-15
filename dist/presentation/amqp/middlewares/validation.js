"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validation = void 0;
const errors_1 = require("@/presentation/amqp/errors");
const validation = (schema) => (message) => {
    const validation = schema.validate(message, {
        abortEarly: false,
        stripUnknown: true,
        allowUnknown: true,
    });
    if (validation.error) {
        throw new errors_1.ValidationError(validation.error.details);
    }
    return validation.value;
};
exports.validation = validation;
exports.default = { validation: exports.validation };
