"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const sinon_1 = __importDefault(require("sinon"));
const chai_1 = require("chai");
const list_users_1 = require("./list-users");
const enum_1 = require("../../../../../core/enum");
describe('ListUsersController', () => {
    describe('#handle', () => {
        it('should return ListUsersResponse', async () => {
            const fakeResponse = [
                {
                    id: 'string',
                    name: 'string',
                    username: 'string',
                    emailAddress: 'string',
                    source: enum_1.UserSources.JsonPlaceholder,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ];
            const listTodoUseCaseFake = {
                list: sinon_1.default.fake.resolves(fakeResponse),
            };
            const container = {
                listTodoUseCase: listTodoUseCaseFake,
            };
            const listUsersController = new list_users_1.ListUsersController(
            // @ts-ignore
            ...Object.values(container));
            const result = await listUsersController.handle();
            chai_1.expect(result).to.be.eql({
                data: fakeResponse.map((user) => ({
                    ...user,
                    createdAt: user.createdAt.toISOString(),
                    updatedAt: user.updatedAt.toISOString(),
                })),
            });
            chai_1.assert(container.listTodoUseCase.list.calledOnce);
        });
    });
    describe('#exception', () => {
        it('should return error', () => {
            const error = new Error();
            // @ts-ignore
            const listUsersController = new list_users_1.ListUsersController();
            const result = listUsersController.exception(error);
            chai_1.expect(result).to.be.eql(error);
        });
    });
});
