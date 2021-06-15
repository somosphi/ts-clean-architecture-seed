"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindUserByIdConsumer = void 0;
const tsyringe_1 = require("tsyringe");
const consumer_1 = require("@/presentation/amqp/consumers/consumer");
const find_user_by_id_schema_1 = require("@/presentation/amqp/consumers/findUserById/find-user-by-id.schema");
const logger_1 = require("@/logger");
const consume_config_1 = require("../consume.config");
let FindUserByIdConsumer = class FindUserByIdConsumer extends consumer_1.Consumer {
    constructor(listUsersByIdUseCase) {
        super();
        this.listUsersByIdUseCase = listUsersByIdUseCase;
    }
    async messageHandler(message) {
        const user = await this.listUsersByIdUseCase.listById(message.id);
        logger_1.logger.info(JSON.stringify(user));
    }
    onConsumeError(err, channel, message) {
        logger_1.logger.error(err);
    }
};
__decorate([
    consume_config_1.validationSchema(find_user_by_id_schema_1.findUserSchema),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FindUserByIdConsumer.prototype, "messageHandler", null);
FindUserByIdConsumer = __decorate([
    tsyringe_1.injectable(),
    consume_config_1.queue('user.find'),
    __param(0, tsyringe_1.inject('ListUsersByIdUseCase')),
    __metadata("design:paramtypes", [Object])
], FindUserByIdConsumer);
exports.FindUserByIdConsumer = FindUserByIdConsumer;
