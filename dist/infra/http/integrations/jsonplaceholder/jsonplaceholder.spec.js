"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const sinon_1 = __importDefault(require("sinon"));
const chai_1 = require("chai");
const integrations_1 = require("@/infra/http/integrations");
const enum_1 = require("@/core/enum");
const env_1 = require("@/main/env");
describe('JsonPlaceHolderIntegration', () => {
    const sandbox = sinon_1.default.createSandbox();
    const baseURL = 'http://localhost:3000';
    sandbox.replace(env_1.env, 'jsonPlaceholderUrl', baseURL);
    describe('#getUsers', () => {
        it('should return all users', async () => {
            const data = [
                {
                    name: 'Test',
                    username: 'test',
                    email: 'test@gmail.com',
                },
            ];
            const fakeHttp = {
                createInstance: sinon_1.default.fake.returns(undefined),
                get: sinon_1.default.fake.resolves({ data }),
            };
            const jsonPlaceHolderIntegration = new integrations_1.JsonPlaceHolderIntegration(
            // @ts-ignore
            fakeHttp);
            const users = await jsonPlaceHolderIntegration.getUsers();
            const result = data.map(item => ({
                emailAddress: item.email,
                name: item.name,
                source: enum_1.UserSources.JsonPlaceholder,
                username: item.username,
            }));
            chai_1.expect(users).to.be.eql(result);
            chai_1.assert(fakeHttp.createInstance.calledOnceWith({ baseURL }));
            chai_1.assert(fakeHttp.get.calledOnceWith('/users'));
        });
    });
});
