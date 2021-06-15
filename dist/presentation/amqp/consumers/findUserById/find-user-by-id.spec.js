"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sinon_1 = __importDefault(require("sinon"));
const chai_1 = require("chai");
const find_user_by_id_1 = require("@/presentation/amqp/consumers/findUserById/find-user-by-id");
const enum_1 = require("@/core/enum");
describe('FindUserByIdConsumer', () => {
    const sandbox = sinon_1.default.createSandbox();
    afterEach(() => {
        sandbox.restore();
    });
    describe('#messageHandler', () => {
        it('should return user by id', async () => {
            const date = new Date();
            const user = {
                id: '1',
                name: 'Test',
                username: 'Test',
                emailAddress: 'test@gmai.com',
                source: enum_1.UserSources.JsonPlaceholder,
                createdAt: date,
                updatedAt: date,
            };
            const fakeListUserByIdUseCase = {
                listById: sinon_1.default.fake.resolves(user),
            };
            const findUserByIdConsumer = new find_user_by_id_1.FindUserByIdConsumer(
            // @ts-ignore
            fakeListUserByIdUseCase);
            const message = {
                id: '1',
            };
            await findUserByIdConsumer.messageHandler(message);
            chai_1.assert(fakeListUserByIdUseCase.listById.calledOnceWith(message.id));
        });
    });
});
