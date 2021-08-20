import sinon from 'sinon';
import { expect, assert } from 'chai';
import { UserCache } from '@/infra/cache';

describe('UserCache', () => {
  const sandbox = sinon.createSandbox();

  afterEach(() => {
    sandbox.restore();
  });

  describe('#getUserEmailAddress', () => {
    it('should return email address by id', async () => {
      const email = 'test@gmail.com';
      const cache = {
        get: sandbox.fake.resolves(email),
      };

      // @ts-ignore
      const userCache = new UserCache(cache);
      const id = 1;
      const result = await userCache.getUserEmailAddress(id);

      expect(result).to.be.eql(email);
      assert(cache.get.calledOnceWith(`users:${id}:emailAddress`));
    });
  });
  describe('#setUserEmailAddress', () => {
    it('should set email address with expiration time', async () => {
      const email = 'test@gmail.com';
      const cache = {
        setWithExpirationTime: sandbox.fake.resolves(undefined),
      };

      // @ts-ignore
      const userCache = new UserCache(cache);
      const id = 1;
      await userCache.setUserEmailAddress(id, email);

      assert(
        cache.setWithExpirationTime.calledOnceWith(
          `users:${id}:emailAddress`,
          email,
          36000
        )
      );
    });
  });
});
