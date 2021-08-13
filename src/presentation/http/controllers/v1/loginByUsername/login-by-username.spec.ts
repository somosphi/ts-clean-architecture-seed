import sinon from 'sinon';
import { expect, assert } from 'chai';
import { LoginByUsernameController } from '@/presentation/http/controllers/v1/loginByUsername/login-by-username';
import { UserNotFoundError } from '@/core/exceptions';
import { NotFoundError } from '@/presentation/http/exceptions';

describe('LoginByUsernameController', () => {
  const sandbox = sinon.createSandbox();

  afterEach(() => {
    sandbox.restore();
  });

  describe('#handle', () => {
    it('should return token in header property', async () => {
      const token = '1';
      const loginByUsernameUseCase = {
        login: sandbox.fake.resolves(token),
      };

      const loginByUsernameController = new LoginByUsernameController(
        loginByUsernameUseCase
      );

      const req = {
        body: {
          username: 'test',
        },
      };
      // @ts-ignore
      const result = await loginByUsernameController.handle(req);
      expect(result).to.be.eql({ headers: { 'User-Info': token } });
      assert(loginByUsernameUseCase.login.calledOnceWith(req.body.username));
    });
  });
  describe('#handle', () => {
    it('should return not found error when error to be instance of UserNotFoundError', () => {
      // @ts-ignore
      const loginByUsernameController = new LoginByUsernameController();

      const error = loginByUsernameController.exception(
        new UserNotFoundError()
      );
      expect(error).to.be.instanceOf(NotFoundError);
    });
  });
});
