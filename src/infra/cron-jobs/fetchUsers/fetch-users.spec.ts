import sinon from 'sinon';
import { assert } from 'chai';
import { FetchUsersJob } from '@/infra/cron-jobs/fetchUsers/fetch-users';
import expectCt from 'helmet/dist/middlewares/expect-ct';

describe('FetchUsersJob', () => {
  class FetchUsersJobTest extends FetchUsersJob {
    runTask() {
      return super.runTask();
    }
  }

  describe('#runTask', () => {
    it('should fetch users from json place holder integration', async () => {
      const ids = ['1'];
      const fakeUseCase = {
        fetchUsers: sinon.fake.resolves(ids),
      };

      const fetchUsersJob = new FetchUsersJobTest(fakeUseCase);
      await fetchUsersJob.runTask();

      assert(fakeUseCase.fetchUsers.calledOnce);
    });
  });
});
