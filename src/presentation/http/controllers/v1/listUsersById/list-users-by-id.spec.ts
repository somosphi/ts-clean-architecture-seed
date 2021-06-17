import 'reflect-metadata';
import sinon from 'sinon';
import { expect, assert } from 'chai';
import { ListUsersByIdController } from './list-users-by-id';
import { UserSources } from '../../../../../core/enum';
import { User } from '../../../../../core/entities/user';
import { HttpRequest } from '../../../ports/http';
import { UserNotFoundError } from '../../../../../core/errors';
import { BadRequest } from '../../../errors';

describe('ListUsersByIdController', () => {
  describe('#handle', () => {
    it('should return ListUsersByIdResponse', async () => {
      const fake_req: HttpRequest = {
        body: {},
        params: {
          id: '12',
        },
      };
      const fake_response: User = {
        id: 'string',
        name: 'string',
        username: 'string',
        email_address: 'string',
        source: UserSources.JsonPlaceholder,
        created_at: new Date(),
        updated_at: new Date(),
      };
      const list_todo_use_case_fake = {
        listById: sinon.fake.resolves(fake_response),
      };

      const container = {
        listTodoUseCase: list_todo_use_case_fake,
      };
      const list_users_by_id_controller = new ListUsersByIdController(
        // @ts-ignore
        ...Object.values(container)
      );

      const result = await list_users_by_id_controller.handle(fake_req);

      expect(result).to.be.eql({
        data: {
          ...fake_response,
          created_at: fake_response.created_at.toISOString(),
          updated_at: fake_response.updated_at.toISOString(),
        },
      });
      assert(
        container.listTodoUseCase.listById.calledOnceWith(fake_req.params.id)
      );
    });
  });

  describe('#exception', () => {
    it('should return Error', () => {
      const error = new Error();
      // @ts-ignore
      const list_users_by_id_controller = new ListUsersByIdController();
      const result = list_users_by_id_controller.exception(error);

      expect(result).to.be.eql(error);
      expect(result).to.be.instanceOf(Error);
    });

    it('should return BadRequest error', () => {
      const error = new UserNotFoundError();
      // @ts-ignore
      const list_users_by_id_controller = new ListUsersByIdController();
      const result = list_users_by_id_controller.exception(error);

      expect(result).to.be.instanceOf(BadRequest);
    });
  });
});
