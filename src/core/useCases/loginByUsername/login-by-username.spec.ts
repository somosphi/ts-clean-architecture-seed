import sinon from 'sinon';
import { assert, expect } from 'chai';
import jwt from 'jsonwebtoken';
import { LoginByUsernameUseCase } from '@/core/useCases';
import { UserNotFoundError } from '@/core/exceptions';
import { env } from '@/main/env';

describe('LoginByUsernameUseCase', () => {
  const sandbox = sinon.createSandbox();

  afterEach(() => {
    sandbox.restore();
  });

  describe('#login', () => {
    it('should return user not found error when the search by username returns undefined or null', async () => {
      const userRepository = {
        getByUsername: sandbox.fake.resolves(undefined),
      };

      // @ts-ignore
      const loginByUsernameUseCase = new LoginByUsernameUseCase(userRepository);

      const username = 'test';
      let error = null;

      try {
        await loginByUsernameUseCase.login(username);
      } catch (err) {
        error = err;
      }

      expect(error).to.be.instanceOf(UserNotFoundError);
      assert(userRepository.getByUsername.calledOnceWith(username));
    });
    it('should return jwt', async () => {
      const user = { name: 'Test', emailAddress: 'test@gmail.com' };
      const userRepository = {
        getByUsername: sandbox.fake.resolves(user),
      };

      const fakeJwtSecret = '1';

      sandbox.replace(env, 'jwtSecret', fakeJwtSecret);
      const fakeToken = '1';
      const stubSign = sandbox.stub(jwt, 'sign').resolves(fakeToken);

      // @ts-ignore
      const loginByUsernameUseCase = new LoginByUsernameUseCase(userRepository);

      const username = 'test';
      const token = await loginByUsernameUseCase.login(username);

      expect(token).to.be.eql(fakeToken);
      assert(userRepository.getByUsername.calledOnceWith(username));
      assert(
        // @ts-ignore
        stubSign.calledOnceWith(
          { name: user.name, username, emailAddress: user.emailAddress },
          fakeJwtSecret
        )
      );
    });
  });
});
