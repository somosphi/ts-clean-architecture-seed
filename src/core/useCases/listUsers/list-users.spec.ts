import 'reflect-metadata';
import sinon from 'sinon';
import { expect, assert } from 'chai';
import { ListUsersUseCase } from './list-users';
import { UserSources } from '../../../core/enum';
import { User } from '../../../core/entities/user';

describe('ListUsersUseCase', () => {
  describe('#list', () => {
    it('should return User[]', async () => {
      const fakeResponse: User[] = [
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

      const jsonPlaceHolderIntegrationFake = {
        getUsers: sinon.fake.resolves(fakeResponse),
      };

      const container = {
        jsonPlaceHolderIntegration: jsonPlaceHolderIntegrationFake,
      };
      const listUsersUseCase = new ListUsersUseCase(
        // @ts-ignore
        ...Object.values(container)
      );

      const result = await listUsersUseCase.list();

      expect(result).to.be.eql(fakeResponse);
      assert(container.jsonPlaceHolderIntegration.getUsers.calledOnce);
    });
  });
});
