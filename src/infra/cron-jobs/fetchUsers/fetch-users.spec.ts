import sinon from 'sinon';
import { assert } from 'chai';
import { FetchUsersJob } from '@/infra/cron-jobs/fetchUsers/fetch-users';

describe('FetchUsersJob', () => {
  class FetchUsersJobTest extends FetchUsersJob {
    runTask() {
      return super.runTask();
    }
  }

  describe('#runTask', () => {
    it('should fetch users from json place holder integration', async () => {
      const ids = ['1'];
      const fake_use_case = {
        fetchUsers: sinon.fake.resolves(ids),
      };

      const fetch_users_job = new FetchUsersJobTest(fake_use_case);
      await fetch_users_job.runTask();

      assert(fake_use_case.fetchUsers.calledOnce);
    });
  });
});
