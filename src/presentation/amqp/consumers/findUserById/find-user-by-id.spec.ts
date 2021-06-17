import sinon from 'sinon';
import { assert } from 'chai';
import { FindUserByIdConsumer } from '@/presentation/amqp/consumers/findUserById/find-user-by-id';
import { UserSources } from '@/core/enum';

describe('FindUserByIdConsumer', () => {
  const sandbox = sinon.createSandbox();

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
        email_address: 'test@gmai.com',
        source: UserSources.JsonPlaceholder,
        created_at: date,
        updated_at: date,
      };

      const fake_list_user_by_id_use_case = {
        listById: sinon.fake.resolves(user),
      };

      const find_user_by_id_consumer = new FindUserByIdConsumer(
        // @ts-ignore
        fake_list_user_by_id_use_case
      );

      const message = {
        id: '1',
      };

      await find_user_by_id_consumer.messageHandler(message);
      assert(fake_list_user_by_id_use_case.listById.calledOnceWith(message.id));
    });
  });
});
