import sinon from 'sinon';
import { Options } from 'amqplib';
import { assert, expect } from 'chai';
import { LogUserInfoProducer } from '@/infra/amqp/producers/logUserInfo/log-user-info';

describe('LogUserInfoProducer', () => {
  const sandbox = sinon.createSandbox();

  afterEach(() => {
    sandbox.restore();
  });

  describe('#send', () => {
    it('should send message to queue', () => {
      const fakeVhost = {};

      // @ts-ignore
      const logUserInfoProducer = new LogUserInfoProducer(fakeVhost);

      const message = {
        id: '1',
        name: 'Test',
        username: 'test',
        emailAddress: 'test@gmail.com',
      };

      const optionsConfig: Options.Publish = {
        priority: 0,
        deliveryMode: 2,
        contentEncoding: 'UTF-8',
        contentType: 'application/json',
      };

      const stubPublish = sandbox
        .stub(logUserInfoProducer, 'publish')
        .returns(undefined);

      logUserInfoProducer.send(message);

      assert(
        stubPublish.calledOnceWith(
          'user.dx',
          'user.create',
          message,
          optionsConfig
        )
      );
    });
    it('should return an error when send method failed', () => {
      const fakeVhost = {};

      // @ts-ignore
      const logUserInfoProducer = new LogUserInfoProducer(fakeVhost);

      const message = {
        id: '1',
        name: 'Test',
        username: 'test',
        emailAddress: 'test@gmail',
      };

      const optionsConfig: Options.Publish = {
        priority: 0,
        deliveryMode: 2,
        contentEncoding: 'UTF-8',
        contentType: 'application/json',
      };

      const stubPublic = sandbox
        .stub(logUserInfoProducer, 'publish')
        .throws(new Error('Test'));

      let error = null;

      try {
        logUserInfoProducer.send(message);
      } catch (err) {
        error = err;
      }

      expect(error).to.be.instanceOf(Error);
      assert(
        stubPublic.calledOnceWith(
          'user.dx',
          'user.create',
          message,
          optionsConfig
        )
      );
    });
  });
});
