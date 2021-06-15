"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const sinon_1 = __importDefault(require("sinon"));
const chai_1 = require("chai");
const enum_1 = require("@/core/enum");
const errors_1 = require("@/core/errors");
const list_users_by_id_1 = require("./list-users-by-id");
describe('ListUsersByIdUseCase', () => {
    describe('#listById', () => {
        it('should return User', async () => {
            const fakeResponse = {
                id: 'string',
                name: 'string',
                username: 'string',
                emailAddress: 'string',
                source: enum_1.UserSources.JsonPlaceholder,
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            const id = '12';
            const userRepositoryFake = {
                getById: sinon_1.default.fake.resolves(fakeResponse),
            };
            const container = {
                userRepository: userRepositoryFake,
            };
            const listUsersByIdUseCase = new list_users_by_id_1.ListUsersByIdUseCase(
            // @ts-ignore
            ...Object.values(container));
            const result = await listUsersByIdUseCase.listById(id);
            chai_1.expect(result).to.be.eql(fakeResponse);
            chai_1.assert(container.userRepository.getById.calledOnceWith(id));
        });
        it('should return UserNotFoundError', async () => {
            const fakeResponse = null;
            const id = '12';
            const userRepositoryFake = {
                getById: sinon_1.default.fake.resolves(fakeResponse),
            };
            const container = {
                userRepository: userRepositoryFake,
            };
            const listUsersByIdUseCase = new list_users_by_id_1.ListUsersByIdUseCase(
            // @ts-ignore
            ...Object.values(container));
            let err = null;
            try {
                await listUsersByIdUseCase.listById(id);
            }
            catch (error) {
                err = error;
            }
            chai_1.expect(err).to.be.eql(err);
            chai_1.expect(err).to.be.instanceOf(errors_1.UserNotFoundError);
        });
    });
});
