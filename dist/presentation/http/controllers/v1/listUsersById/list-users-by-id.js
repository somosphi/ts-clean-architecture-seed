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
exports.ListUsersByIdController = void 0;
const tsyringe_1 = require("tsyringe");
const controller_config_1 = require("../../controller.config");
const controller_1 = require("../../controller");
const errors_1 = require("../../../../../core/errors");
const errors_2 = require("../../../errors");
const validator_schema_1 = require("../../../middleware/validator-schema");
const list_users_by_id_schema_1 = require("./list-users-by-id.schema");
let ListUsersByIdController = class ListUsersByIdController extends controller_1.Controller {
    constructor(listUsersByIdUseCase) {
        super();
        this.listUsersByIdUseCase = listUsersByIdUseCase;
    }
    async handle(req) {
        const { id } = req.params;
        const user = await this.listUsersByIdUseCase.listById(id);
        return {
            data: {
                ...user,
                createdAt: user.createdAt.toISOString(),
                updatedAt: user.updatedAt.toISOString(),
            },
        };
    }
    exception(error) {
        if (error instanceof errors_1.UserNotFoundError) {
            const { code, message } = error;
            return new errors_2.BadRequest(message, code);
        }
        return error;
    }
};
__decorate([
    controller_config_1.httpStatus(200),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ListUsersByIdController.prototype, "handle", null);
ListUsersByIdController = __decorate([
    controller_config_1.version('/v1'),
    controller_config_1.get('/users/:id', [validator_schema_1.validatorMiddleware(list_users_by_id_schema_1.listByIdSchema)]),
    tsyringe_1.injectable(),
    __param(0, tsyringe_1.inject('ListUsersByIdUseCase')),
    __metadata("design:paramtypes", [Object])
], ListUsersByIdController);
exports.ListUsersByIdController = ListUsersByIdController;
