"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToJson = exports.converter = void 0;
const converter = (content) => {
    switch (typeof content) {
        case 'object':
            return Buffer.from(JSON.stringify(content));
        case 'string':
            return Buffer.from(String(content));
        default:
            return Buffer.from('');
    }
};
exports.converter = converter;
const convertToJson = (content) => {
    return JSON.parse(content.toString());
};
exports.convertToJson = convertToJson;
