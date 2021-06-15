"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sinon_1 = __importDefault(require("sinon"));
const chai_1 = require("chai");
const fetch_users_1 = require("@/infra/cron-jobs/fetchUsers/fetch-users");
describe('FetchUsersJob', () => {
    class FetchUsersJobTest extends fetch_users_1.FetchUsersJob {
        runTask() {
            return super.runTask();
        }
    }
    describe('#runTask', () => {
        it('should fetch users from json place holder integration', async () => {
            const ids = ['1'];
            const fakeUseCase = {
                fetchUsers: sinon_1.default.fake.resolves(ids),
            };
            const fetchUsersJob = new FetchUsersJobTest(fakeUseCase);
            await fetchUsersJob.runTask();
            chai_1.assert(fakeUseCase.fetchUsers.calledOnce);
        });
    });
});
