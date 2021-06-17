import 'reflect-metadata';
import sinon from 'sinon';
import { expect, assert } from 'chai';
import { User } from '@/core/entities/user';
import { UserSources } from '@/core/enum';
import { FetchUsersUseCase } from './fetch-users';

describe('FetchUsersUseCase', () => {
  describe('#fetchUsers', () => {
    it('should fetch all users when database result is empty', async () => {
      const source_database_users: User[] = [];

      const json_placeholder_users: any[] = [
        {
          name: 'Fulano',
          username: 'fulano',
          email_address: 'AAA@AAA.com',
        },
      ];

      const placeholder_emails = json_placeholder_users.map(
        json_placeholder_user => json_placeholder_user.email_address
      );

      const providers = {
        json_placeholder_integration: {
          getUsers: sinon.fake.resolves(json_placeholder_users),
        },
        user_repository: {
          getByEmailsWithSource: sinon.fake.resolves(source_database_users),
          create: sinon.fake.resolves('1'),
          transaction: sinon.fake((cb: Function) => cb()),
        },
      };

      const fetch_users_use_case = new FetchUsersUseCase(
        // @ts-ignore
        ...Object.values(providers)
      );

      const fetched_ids = await fetch_users_use_case.fetchUsers();

      const [fetch_user] = json_placeholder_users;
      expect(fetched_ids).to.be.eql(['1']);
      assert(providers.json_placeholder_integration.getUsers.calledOnce);
      assert(
        providers.user_repository.getByEmailsWithSource(
          placeholder_emails,
          UserSources.JsonPlaceholder
        )
      );
      assert(
        providers.user_repository.create.calledOnceWith({
          name: fetch_user.name,
          username: fetch_user.username,
          email_address: fetch_user.email_address.toLowerCase(),
          source: UserSources.JsonPlaceholder,
        })
      );
    });
  });
});
