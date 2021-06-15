"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.table = void 0;
const table = function (tableName) {
    return function (constructor) {
        constructor.prototype.tableName = tableName;
    };
};
exports.table = table;
