import 'reflect-metadata';
import sinon from 'sinon';
import { expect, assert } from 'chai';
import { User } from '@/core/entities/user';
import { UserSources } from '@/core/enum';
import { FetchUsersUseCase } from '@/core/useCases/fetchUsers/fetch-users';

describe('FetchUsersUseCase', () => {
  describe('#fetchUsers', () => {
    it('should fetch all users when database result is empty', async () => {
      const sourceDatabaseUsers: User[] = [];

      const jsonPlaceholderUsers: any[] = [
        {
          name: 'Fulano',
          username: 'fulano',
          emailAddress: 'AAA@AAA.com',
        },
      ];

      const placeholderEmails = jsonPlaceholderUsers.map(
        jsonPlaceholderUser => jsonPlaceholderUser.emailAddress
      );

      const providers = {
        jsonPlaceholderIntegration: {
          getUsers: sinon.fake.resolves(jsonPlaceholderUsers),
        },
        userRepository: {
          getByEmailsWithSource: sinon.fake.resolves(sourceDatabaseUsers),
          create: sinon.fake.resolves('1'),
          transaction: sinon.fake((cb: Function) => cb()),
        },
      };

      const fetchUsersUseCase = new FetchUsersUseCase(
        // @ts-ignore
        ...Object.values(providers)
      );

      const fetchedIds = await fetchUsersUseCase.fetchUsers();

      const [fetchUser] = jsonPlaceholderUsers;
      expect(fetchedIds).to.be.eql(['1']);
      assert(providers.jsonPlaceholderIntegration.getUsers.calledOnce);
      assert(
        providers.userRepository.getByEmailsWithSource(
          placeholderEmails,
          UserSources.JsonPlaceholder
        )
      );
      assert(
        providers.userRepository.create.calledOnceWith({
          name: fetchUser.name,
          username: fetchUser.username,
          emailAddress: fetchUser.emailAddress.toLowerCase(),
          source: UserSources.JsonPlaceholder,
        })
      );
    });
  });
});
