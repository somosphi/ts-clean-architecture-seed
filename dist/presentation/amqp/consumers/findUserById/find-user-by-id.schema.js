"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.findUserSchema = joi_1.default.object({
    id: joi_1.default.string().required(),
});
