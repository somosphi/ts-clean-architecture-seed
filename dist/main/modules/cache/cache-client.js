"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheClient = void 0;
const tsyringe_1 = require("tsyringe");
const ioredis_1 = __importDefault(require("ioredis"));
const logger_1 = require("@/logger");
const env_1 = require("@/main/env");
let CacheClient = class CacheClient {
    async start() {
        logger_1.logger.info(`Started cache client`);
        this.redisClient = new ioredis_1.default({
            port: env_1.env.redisPort,
            host: env_1.env.redisHost,
        });
    }
};
CacheClient = __decorate([
    tsyringe_1.injectable()
], CacheClient);
exports.CacheClient = CacheClient;
