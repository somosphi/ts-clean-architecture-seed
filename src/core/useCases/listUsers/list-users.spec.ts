import 'reflect-metadata';
import sinon from 'sinon';
import { expect, assert } from 'chai';
import { UserSources } from '@/core/enum';
import { User } from '@/core/entities/user';
import { ListUsersUseCase } from './list-users';

describe('ListUsersUseCase', () => {
  describe('#list', () => {
    it('should return User[]', async () => {
      const fake_response: User[] = [
        {
          id: 'string',
          name: 'string',
          username: 'string',
          email_address: 'string',
          source: UserSources.JsonPlaceholder,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 'string',
          name: 'string',
          username: 'string',
          email_address: 'string',
          source: UserSources.JsonPlaceholder,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ];

      const fake_user_repository = {
        all: sinon.fake.resolves(fake_response),
      };

      // @ts-ignore
      const list_users_use_case = new ListUsersUseCase(fake_user_repository);

      const result = await list_users_use_case.list();

      expect(result).to.be.eql(fake_response);
      assert(fake_user_repository.all.calledOnce);
    });
  });
});
