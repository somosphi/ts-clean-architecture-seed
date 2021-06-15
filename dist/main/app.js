"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
require("reflect-metadata");
const class_validator_1 = require("class-validator");
const app_container_1 = __importDefault(require("@/main/container/app-container"));
const http_server_1 = require("@/main/modules/http/http-server");
const amqp_server_1 = require("@/main/modules/amqp/amqp-server");
const env_1 = require("@/main/env");
const worker_1 = require("./modules/worker/worker");
const cache_client_1 = require("./modules/cache/cache-client");
class Application {
    loadModules(container) {
        return [
            new http_server_1.HttpServer(container),
            new worker_1.Worker(container),
            new amqp_server_1.AMQPServer(container, {
                protocol: env_1.env.rabbitMQProtocol,
                host: env_1.env.rabbitMQHost,
                port: env_1.env.rabbitMQPort,
                username: env_1.env.rabbitMQUsername,
                password: env_1.env.rabbitMQPassword,
                vhost: env_1.env.rabbitMQVHost,
            }),
            new cache_client_1.CacheClient(),
        ];
    }
    async start() {
        await class_validator_1.validateOrReject(env_1.env);
        for (const module of this.loadModules(app_container_1.default)) {
            module.start();
        }
    }
    throwEnvValidatorErrors(err) {
        err.forEach((item) => {
            for (const key in item.constraints) {
                if (key) {
                    const message = item.constraints[key];
                    throw new Error(message);
                }
            }
        });
    }
}
exports.Application = Application;
