import 'reflect-metadata';
import sinon from 'sinon';
import { expect, assert } from 'chai';
import { ListUsersController } from './list-users';
import { UserSources } from '../../../../../core/enum';
import { User } from '../../../../../core/entities/user';

describe('ListUsersController', () => {
  describe('#handle', () => {
    it('should return ListUsersResponse', async () => {
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
      ];

      const listTodoUseCaseFake = {
        list: sinon.fake.resolves(fakeResponse),
      };

      const container = {
        listTodoUseCase: listTodoUseCaseFake,
      };
      const listUsersController = new ListUsersController(
        // @ts-ignore
        ...Object.values(container)
      );

      const result = await listUsersController.handle();

      expect(result).to.be.eql({
        data: fakeResponse.map((user: User) => ({
          ...user,
          createdAt: user.createdAt.toISOString(),
          updatedAt: user.updatedAt.toISOString(),
        })),
      });
      assert(container.listTodoUseCase.list.calledOnce);
    });
  });

  describe('#exception', () => {
    it('should return error', () => {
      const error = new Error();
      // @ts-ignore
      const listUsersController = new ListUsersController();
      const result = listUsersController.exception(error);

      expect(result).to.be.eql(error);
    });
  });
});
