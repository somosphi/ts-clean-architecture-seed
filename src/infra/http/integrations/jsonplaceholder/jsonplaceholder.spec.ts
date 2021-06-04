import 'reflect-metadata';
import sinon from 'sinon';
import { expect, assert } from 'chai';
import { JsonPlaceHolderIntegration } from '@/infra/http/integrations';
import { UserSources } from '@/core/enum';
import { env } from '@/main/env';

describe('JsonPlaceHolderIntegration', () => {
  const sandbox = sinon.createSandbox();
  const baseURL = 'http://localhost:3000';
  sandbox.replace(env, 'jsonPlaceholderUrl', baseURL);

  describe('#getUsers', () => {
    it('should return all users', async () => {
      const data = [
        {
          name: 'Test',
          username: 'test',
          email: 'test@gmail.com',
        },
      ];

      const fakeHttp = {
        createInstance: sinon.fake.returns(undefined),
        get: sinon.fake.resolves({ data }),
      };
      const jsonPlaceHolderIntegration = new JsonPlaceHolderIntegration(
        //@ts-ignore
        fakeHttp
      );

      const users = await jsonPlaceHolderIntegration.getUsers();
      const result = data.map(item => ({
        emailAddress: item.email,
        name: item.name,
        source: UserSources.JsonPlaceholder,
        username: item.username,
      }));

      expect(users).to.be.eql(result);
      assert(fakeHttp.createInstance.calledOnceWith({ baseURL }));
      assert(fakeHttp.get.calledOnceWith('/users'));
    });
  });
});
