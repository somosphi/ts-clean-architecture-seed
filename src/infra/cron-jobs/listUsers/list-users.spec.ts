import sinon from 'sinon';
import { assert } from 'chai';
import { ListUsersJob } from '@/infra/cron-jobs/listUsers/list-users';
import { UserSources } from '@/core/enum';

describe('FetchUsersJob', () => {
  class ListUsersJobTest extends ListUsersJob {
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
          email_address: 'test@test.com',
          source: UserSources.JsonPlaceholder,
          created_at: now,
          updated_at: now,
        },
      ];
      const fake_use_case = {
        list: sinon.fake.resolves(users),
      };

      const list_users_job = new ListUsersJobTest(fake_use_case);
      await list_users_job.runTask();

      assert(fake_use_case.list.calledOnce);
    });
  });
});
