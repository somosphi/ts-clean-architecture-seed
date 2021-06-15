"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationSchema = exports.queue = void 0;
const queue = function (queue) {
    return function (constructor) {
        constructor.prototype.queue = queue;
    };
};
exports.queue = queue;
const validationSchema = function (schema) {
    return function (target) {
        target.schema = schema;
    };
};
exports.validationSchema = validationSchema;
