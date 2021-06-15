"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const sinon_1 = __importDefault(require("sinon"));
const chai_1 = require("chai");
const list_users_by_id_1 = require("./list-users-by-id");
const enum_1 = require("../../../../../core/enum");
const errors_1 = require("../../../../../core/errors");
const errors_2 = require("../../../errors");
describe('ListUsersByIdController', () => {
    describe('#handle', () => {
        it('should return ListUsersByIdResponse', async () => {
            const fakeReq = {
                body: {},
                params: {
                    id: '12',
                },
            };
            const fakeResponse = {
                id: 'string',
                name: 'string',
                username: 'string',
                emailAddress: 'string',
                source: enum_1.UserSources.JsonPlaceholder,
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            const listTodoUseCaseFake = {
                listById: sinon_1.default.fake.resolves(fakeResponse),
            };
            const container = {
                listTodoUseCase: listTodoUseCaseFake,
            };
            const listUsersByIdController = new list_users_by_id_1.ListUsersByIdController(
            // @ts-ignore
            ...Object.values(container));
            const result = await listUsersByIdController.handle(fakeReq);
            chai_1.expect(result).to.be.eql({
                data: {
                    ...fakeResponse,
                    createdAt: fakeResponse.createdAt.toISOString(),
                    updatedAt: fakeResponse.updatedAt.toISOString(),
                },
            });
            chai_1.assert(container.listTodoUseCase.listById.calledOnceWith(fakeReq.params.id));
        });
    });
    describe('#exception', () => {
        it('should return Error', () => {
            const error = new Error();
            // @ts-ignore
            const listUsersByIdController = new list_users_by_id_1.ListUsersByIdController();
            const result = listUsersByIdController.exception(error);
            chai_1.expect(result).to.be.eql(error);
            chai_1.expect(result).to.be.instanceOf(Error);
        });
        it('should return BadRequest error', () => {
            const error = new errors_1.UserNotFoundError();
            // @ts-ignore
            const listUsersByIdController = new list_users_by_id_1.ListUsersByIdController();
            const result = listUsersByIdController.exception(error);
            chai_1.expect(result).to.be.instanceOf(errors_2.BadRequest);
        });
    });
});
