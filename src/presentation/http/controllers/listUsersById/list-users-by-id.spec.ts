import 'reflect-metadata';
import sinon from 'sinon';
import { expect, assert } from 'chai';
import { ListUsersByIdController } from './list-users-by-id';
import { UserSources } from '../../../../core/enum';
import { User } from '../../../../core/entities/user';
import { HttpRequest } from '../../ports/http';
import { UserNotFoundError } from '../../../../core/errors';
import { BadRequest } from '../../errors';

describe('ListUsersByIdController', () => {
  describe('#handle', () => {
    it('should return ListUsersByIdResponse', async () => {
      const fakeReq: HttpRequest = {
        body: {},
        params: {
          id: '12',
        },
      };
      const fakeResponse: User = {
        id: 'string',
        name: 'string',
        username: 'string',
        emailAddress: 'string',
        source: UserSources.JsonPlaceholder,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const listTodoUseCaseFake = {
        listById: sinon.fake.resolves(fakeResponse),
      };

      const container = {
        listTodoUseCase: listTodoUseCaseFake,
      };
      const listUsersByIdController = new ListUsersByIdController(
        // @ts-ignore
        ...Object.values(container)
      );

      const result = await listUsersByIdController.handle(fakeReq);

      expect(result).to.be.eql({
        data: {
          ...fakeResponse,
          createdAt: fakeResponse.createdAt.toISOString(),
          updatedAt: fakeResponse.updatedAt.toISOString(),
        },
      });
      assert(
        container.listTodoUseCase.listById.calledOnceWith(fakeReq.params.id)
      );
    });
  });

  describe('#exception', () => {
    it('should return Error', () => {
      const error = new Error();
      // @ts-ignore
      const listUsersByIdController = new ListUsersByIdController();
      const result = listUsersByIdController.exception(error);

      expect(result).to.be.eql(error);
      expect(result).to.be.instanceOf(Error);
    });

    it('should return BadRequest error', () => {
      const error = new UserNotFoundError();
      // @ts-ignore
      const listUsersByIdController = new ListUsersByIdController();
      const result = listUsersByIdController.exception(error);

      expect(result).to.be.instanceOf(BadRequest);
    });
  });
});
