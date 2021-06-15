"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sinon_1 = __importDefault(require("sinon"));
const chai_1 = require("chai");
const list_users_1 = require("@/infra/cron-jobs/listUsers/list-users");
const enum_1 = require("@/core/enum");
describe('FetchUsersJob', () => {
    class ListUsersJobTest extends list_users_1.ListUsersJob {
        runTask() {
            return super.runTask();
        }
    }
    describe('#runTask', () => {
        it('should list users from database', async () => {
            const now = new Date();
            const users = [
                {
                    id: '1',
                    name: 'test',
                    username: 'test',
                    emailAddress: 'test@test.com',
                    source: enum_1.UserSources.JsonPlaceholder,
                    createdAt: now,
                    updatedAt: now,
                },
            ];
            const fakeUseCase = {
                list: sinon_1.default.fake.resolves(users),
            };
            const listUsersJob = new ListUsersJobTest(fakeUseCase);
            await listUsersJob.runTask();
            chai_1.assert(fakeUseCase.list.calledOnce);
        });
    });
});
