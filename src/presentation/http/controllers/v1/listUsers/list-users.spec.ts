import 'reflect-metadata';
import sinon from 'sinon';
import { expect, assert } from 'chai';
import { ListUsersController } from './list-users';
import { UserSources } from '../../../../../core/enum';
import { User } from '../../../../../core/entities/user';

describe('ListUsersController', () => {
  describe('#handle', () => {
    it('should return ListUsersResponse', async () => {
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
      ];

      const list_todo_use_case_fake = {
        list: sinon.fake.resolves(fake_response),
      };

      const container = {
        listTodoUseCase: list_todo_use_case_fake,
      };
      const list_users_controller = new ListUsersController(
        // @ts-ignore
        ...Object.values(container)
      );

      const result = await list_users_controller.handle();

      expect(result).to.be.eql({
        data: fake_response.map((user: User) => ({
          ...user,
          created_at: user.created_at.toISOString(),
          updated_at: user.updated_at.toISOString(),
        })),
      });
      assert(container.listTodoUseCase.list.calledOnce);
    });
  });

  describe('#exception', () => {
    it('should return error', () => {
      const error = new Error();
      // @ts-ignore
      const list_users_controller = new ListUsersController();
      const result = list_users_controller.exception(error);

      expect(result).to.be.eql(error);
    });
  });
});
