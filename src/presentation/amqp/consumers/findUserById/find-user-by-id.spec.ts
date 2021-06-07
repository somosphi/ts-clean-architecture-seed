import sinon from 'sinon';
import { expect, assert } from 'chai';
import { FindUserByIdConsumer } from '@/presentation/amqp/consumers/findUserById/find-user-by-id';
import * as middlewares from '@/presentation/amqp/middlewares/validation';
import * as helpers from '@/shared/helper/buffer-converter';
import { FindUserMessage } from '@/presentation/amqp/consumers/findUserById/find-user-by-id.dto';
import { findUserSchema } from '@/presentation/amqp/consumers/findUserById/find-user-by-id.schema';
import { UserSources } from '@/core/enum';

describe('FindUserByIdConsumer', () => {
  const sandbox = sinon.createSandbox();

  class FindUserByIdConsumerTest extends FindUserByIdConsumer {
    async findUserById(findMessage: FindUserMessage) {
      super.findUserById(findMessage);
    }
  }

  afterEach(() => {
    sandbox.restore();
  });

  describe('#messageHandler', () => {
    it('should call findUserById function', async () => {
      const fakeListUserByIdUseCase = {};
      const findUserByIdConsumer = new FindUserByIdConsumerTest(
        //@ts-ignore
        fakeListUserByIdUseCase
      );

      const payload = {
        id: '1',
      };

      const message = {
        content: payload,
      };

      const fakeMessageConverted = sinon.fake.returns(message.content);

      const stubConvertToJson = sandbox
        .stub(helpers, 'convertToJson')
        .returns(payload);

      const stubFindUserById = sandbox
        .stub(findUserByIdConsumer, 'findUserById')
        .resolves(undefined);

      const stubValidation = sandbox
        .stub(middlewares, 'validation')
        .returns(fakeMessageConverted);

      //@ts-ignore
      findUserByIdConsumer.messageHandler(message);

      assert(stubFindUserById.calledOnceWith(payload));
      assert(stubValidation.calledOnceWith(findUserSchema));
      //@ts-ignore
      assert(stubConvertToJson.calledOnceWith(message.content));
    });
  });
  describe('#findUserById', () => {
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

      const findUserByIdConsumer = new FindUserByIdConsumerTest(
        //@ts-ignore
        fakeListUserByIdUseCase
      );

      const message = {
        id: '1',
      };

      await findUserByIdConsumer.findUserById(message);
      assert(fakeListUserByIdUseCase.listById.calledOnceWith(message.id));
    });
  });
});
