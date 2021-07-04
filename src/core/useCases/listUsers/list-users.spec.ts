import 'reflect-metadata';
import sinon from 'sinon';
import { expect, assert } from 'chai';
import { UserSources } from '@/core/enum';
import { User } from '@/core/entities/user';
import { ListUsersUseCase } from './list-users';

describe('ListUsersUseCase', () => {
  describe('#list', () => {
    it('should return User[]', async () => {
      const fakeResponse = [
        {
          id: 'string',
          name: 'string',
          username: 'string',
          emailAddress: 'string',
          source: UserSources.JsonPlaceholder,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'string',
          name: 'string',
          username: 'string',
          emailAddress: 'string',
          source: UserSources.JsonPlaceholder,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      const fakeUserRepository = {
        all: sinon.fake.resolves(fakeResponse),
      };

      // @ts-ignore
      const listUsersUseCase = new ListUsersUseCase(fakeUserRepository);

      const result = await listUsersUseCase.list();

      expect(result).to.be.eql(fakeResponse);
      assert(fakeUserRepository.all.calledOnce);
    });
  });
});
