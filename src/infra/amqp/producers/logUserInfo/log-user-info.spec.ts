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
      const fake_vhost = {};

      // @ts-ignore
      const log_user_info_producer = new LogUserInfoProducer(fake_vhost);

      const message = {
        id: '1',
        name: 'Test',
        username: 'test',
        email_address: 'test@gmail.com',
      };

      const options_config: Options.Publish = {
        priority: 0,
        deliveryMode: 2,
        contentEncoding: 'UTF-8',
        contentType: 'application/json',
      };

      const stub_publish = sandbox
        .stub(log_user_info_producer, 'publish')
        .returns(undefined);

      log_user_info_producer.send(message);

      assert(
        stub_publish.calledOnceWith(
          'user.dx',
          'user.create',
          message,
          options_config
        )
      );
    });
    it('should return an error when send method failed', () => {
      const fake_vhost = {};

      // @ts-ignore
      const log_user_info_producer = new LogUserInfoProducer(fake_vhost);

      const message = {
        id: '1',
        name: 'Test',
        username: 'test',
        email_address: 'test@gmail',
      };

      const options_config: Options.Publish = {
        priority: 0,
        deliveryMode: 2,
        contentEncoding: 'UTF-8',
        contentType: 'application/json',
      };

      const stub_public = sandbox
        .stub(log_user_info_producer, 'publish')
        .throws(new Error('Test'));

      let error = null;

      try {
        log_user_info_producer.send(message);
      } catch (err) {
        error = err;
      }

      expect(error).to.be.instanceOf(Error);
      assert(
        stub_public.calledOnceWith(
          'user.dx',
          'user.create',
          message,
          options_config
        )
      );
    });
  });
});
