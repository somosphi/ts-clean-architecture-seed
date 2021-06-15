"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sinon_1 = __importDefault(require("sinon"));
const chai_1 = require("chai");
const log_user_info_1 = require("@/infra/amqp/producers/logUserInfo/log-user-info");
describe('LogUserInfoProducer', () => {
    const sandbox = sinon_1.default.createSandbox();
    afterEach(() => {
        sandbox.restore();
    });
    describe('#send', () => {
        it('should send message to queue', () => {
            const fakeVhost = {};
            // @ts-ignore
            const logUserInfoProducer = new log_user_info_1.LogUserInfoProducer(fakeVhost);
            const message = {
                id: '1',
                name: 'Test',
                username: 'test',
                emailAddress: 'test@gmail.com',
            };
            const optionsConfig = {
                priority: 0,
                deliveryMode: 2,
                contentEncoding: 'UTF-8',
                contentType: 'application/json',
            };
            const stubPublish = sandbox
                .stub(logUserInfoProducer, 'publish')
                .returns(undefined);
            logUserInfoProducer.send(message);
            chai_1.assert(stubPublish.calledOnceWith('user.dx', 'user.create', message, optionsConfig));
        });
        it('should return an error when send method failed', () => {
            const fakeVhost = {};
            // @ts-ignore
            const logUserInfoProducer = new log_user_info_1.LogUserInfoProducer(fakeVhost);
            const message = {
                id: '1',
                name: 'Test',
                username: 'test',
                emailAddress: 'test@gmail',
            };
            const optionsConfig = {
                priority: 0,
                deliveryMode: 2,
                contentEncoding: 'UTF-8',
                contentType: 'application/json',
            };
            const stubPublic = sandbox
                .stub(logUserInfoProducer, 'publish')
                .throws(new Error('Test'));
            let error = null;
            try {
                logUserInfoProducer.send(message);
            }
            catch (err) {
                error = err;
            }
            chai_1.expect(error).to.be.instanceOf(Error);
            chai_1.assert(stubPublic.calledOnceWith('user.dx', 'user.create', message, optionsConfig));
        });
    });
});
