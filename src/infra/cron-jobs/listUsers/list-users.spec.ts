import sinon from 'sinon';
import { assert } from 'chai';
import { ListUsersJob } from '@/infra/cron-jobs/listUsers/list-users';
import { UserSources } from '@/core/enum';

describe('FetchUsersJob', () => {
  class ListUsersJobTest extends ListUsersJob {
    command() {
      return super.run();
    }
  }

  describe('#run', () => {
    it('should list users from database', async () => {
      const now = new Date();
      const users = [
        {
          id: '1',
          name: 'test',
          username: 'test',
          emailAddress: 'test@test.com',
          source: UserSources.JsonPlaceholder,
          createdAt: now,
          updatedAt: now,
        },
      ];
      const fakeUseCase = {
        list: sinon.fake.resolves(users),
      };

      const listUsersJob = new ListUsersJobTest(fakeUseCase);
      await listUsersJob.run();

      assert(fakeUseCase.list.calledOnce);
    });
  });
});
