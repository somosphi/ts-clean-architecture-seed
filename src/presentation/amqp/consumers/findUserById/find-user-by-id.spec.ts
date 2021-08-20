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
        emailAddress: 'test@gmai.com',
        source: UserSources.JsonPlaceholder,
        createdAt: date,
        updatedAt: date,
      };

      const fakeListUserByIdUseCase = {
        listById: sinon.fake.resolves(user),
      };

      const findUserByIdConsumer = new FindUserByIdConsumer(
        // @ts-ignore
        fakeListUserByIdUseCase
      );

      const message = {
        id: '1',
      };

      await findUserByIdConsumer.messageHandler(message);
      assert(fakeListUserByIdUseCase.listById.calledOnceWith(message.id));
    });
  });
});
