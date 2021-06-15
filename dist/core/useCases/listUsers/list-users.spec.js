"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const sinon_1 = __importDefault(require("sinon"));
const chai_1 = require("chai");
const enum_1 = require("@/core/enum");
const list_users_1 = require("./list-users");
describe('ListUsersUseCase', () => {
    describe('#list', () => {
        it('should return User[]', async () => {
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
            const fakeUserRepository = {
                all: sinon_1.default.fake.resolves(fakeResponse),
            };
            // @ts-ignore
            const listUsersUseCase = new list_users_1.ListUsersUseCase(fakeUserRepository);
            const result = await listUsersUseCase.list();
            chai_1.expect(result).to.be.eql(fakeResponse);
            chai_1.assert(fakeUserRepository.all.calledOnce);
        });
    });
});
