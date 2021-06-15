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
exports.ListUsersController = void 0;
const tsyringe_1 = require("tsyringe");
const controller_1 = require("../../controller");
const controller_config_1 = require("../../controller.config");
let ListUsersController = class ListUsersController extends controller_1.Controller {
    constructor(listUsersUseCase) {
        super();
        this.listUsersUseCase = listUsersUseCase;
    }
    async handle() {
        const users = await this.listUsersUseCase.list();
        return {
            data: users.map((user) => ({
                ...user,
                createdAt: user.createdAt.toISOString(),
                updatedAt: user.updatedAt.toISOString(),
            })),
        };
    }
    exception(error) {
        return error;
    }
};
__decorate([
    controller_config_1.httpStatus(200),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ListUsersController.prototype, "handle", null);
ListUsersController = __decorate([
    controller_config_1.version('/v1'),
    controller_config_1.get('/users'),
    tsyringe_1.injectable(),
    __param(0, tsyringe_1.inject('ListUsersUseCase')),
    __metadata("design:paramtypes", [Object])
], ListUsersController);
exports.ListUsersController = ListUsersController;
