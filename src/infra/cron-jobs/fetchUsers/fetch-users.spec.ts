import sinon from 'sinon';
import { assert } from 'chai';
import { FetchUsersJob } from '@/infra/cron-jobs/fetchUsers/fetch-users';

describe('FetchUsersJob', () => {
  class FetchUsersJobTest extends FetchUsersJob {
    runTask() {
      return super.run();
    }
  }

  describe('#run', () => {
    it('should fetch users from json place holder integration', async () => {
      const ids = ['1'];
      const fakeUseCase = {
        fetchUsers: sinon.fake.resolves(ids),
      };

      const fetchUsersJob = new FetchUsersJobTest(fakeUseCase);
      await fetchUsersJob.run();

      assert(fakeUseCase.fetchUsers.calledOnce);
    });
  });
});
