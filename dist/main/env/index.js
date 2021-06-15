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
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv = __importStar(require("dotenv"));
const validator_1 = require("./validator");
dotenv.config();
const props = {
    httpPort: (process.env.HTTP_PORT && parseInt(process.env.HTTP_PORT, 10)) || 3000,
    httpBodyLimit: process.env.HTTP_BODY_LIMIT || '10kb',
    jsonPlaceholderUrl: process.env.JSON_PLACEHOLDER_URL || 'https://jsonplaceholder.typicode.com',
    rabbitMQEnabled: process.env.RABBITMQ_ENABLED || 'false',
    rabbitMQProtocol: process.env.RABBITMQ_PROTOCOL || 'amqp',
    rabbitMQHost: process.env.RABBITMQ_HOST || 'localhost',
    rabbitMQPort: parseInt(process.env.RABBITMQ_PORT || '5672', 10),
    rabbitMQUsername: process.env.RABBITMQ_USERNAME || 'admin',
    rabbitMQPassword: process.env.RABBITMQ_PASSWORD || 'admin',
    rabbitMQVHost: process.env.RABBITMQ_VHOST || '/',
    redisPort: process.env.REDIS_PORT
        ? parseInt(process.env.REDIS_PORT, 10)
        : 6379,
    redisHost: process.env.REDIS_HOST || '',
};
exports.env = new validator_1.EnvValidator(props);
