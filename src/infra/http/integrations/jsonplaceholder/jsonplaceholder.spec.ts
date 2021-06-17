import 'reflect-metadata';
import sinon from 'sinon';
import { expect, assert } from 'chai';
import { JsonPlaceHolderIntegration } from '@/infra/http/integrations';
import { UserSources } from '@/core/enum';
import { env } from '@/main/env';

describe('JsonPlaceHolderIntegration', () => {
  const sandbox = sinon.createSandbox();
  const base_url = 'http://localhost:3000';
  sandbox.replace(env, 'json_placeholder_url', base_url);

  describe('#getUsers', () => {
    it('should return all users', async () => {
      const data = [
        {
          name: 'Test',
          username: 'test',
          email: 'test@gmail.com',
        },
      ];

      const fake_http = {
        createInstance: sinon.fake.returns(undefined),
        get: sinon.fake.resolves({ data }),
      };
      const json_placeholder_integration = new JsonPlaceHolderIntegration(
        // @ts-ignore
        fake_http
      );

      const users = await json_placeholder_integration.getUsers();
      const result = data.map(item => ({
        email_address: item.email,
        name: item.name,
        source: UserSources.JsonPlaceholder,
        username: item.username,
      }));

      expect(users).to.be.eql(result);
      assert(fake_http.createInstance.calledOnceWith({ baseURL: base_url }));
      assert(fake_http.get.calledOnceWith('/users'));
    });
  });
});
