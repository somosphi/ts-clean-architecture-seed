"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.axiosLogger = exports.expressLogger = exports.logger = void 0;
const logger_1 = require("@somosphi/logger");
const bunyan_format_1 = __importDefault(require("bunyan-format"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const formatOut = bunyan_format_1.default({
    outputMode: process.env.LOGGER_BEAUTIFY ? 'short' : 'bunyan',
});
const { Logger, ExpressLogger, AxiosLogger } = logger_1.init({
    PROJECT_NAME: 'clean-arquitecture-boilerplate',
    // @ts-ignore
    LOG_LEVEL: process.env.LOGGER_LEVEL || 'info',
    STREAMS: [
        {
            stream: formatOut,
        },
    ],
});
exports.logger = Logger;
exports.expressLogger = ExpressLogger;
exports.axiosLogger = AxiosLogger;
