import 'reflect-metadata';
import sinon from 'sinon';
import { expect, assert } from 'chai';
import { ListTodoController } from './list-todo';
import { ListTodoResponse } from './list-todo.response';
import { Status } from '../../../core/enum';

describe('ListTodoController', () => {
  describe('#handle', () => {
    it('should return listTodoResponse', async () => {
      const fakeResponse: ListTodoResponse[] = [
        {
          description: '',
          id: '',
          status: Status.Done,
          title: '',
        },
      ];

      const listTodoUseCaseFake = {
        load: sinon.fake.resolves(fakeResponse),
      };

      const container = {
        listTodoUseCase: listTodoUseCaseFake,
      };
      const listTodoController = new ListTodoController(
        // @ts-ignore
        ...Object.values(container)
      );

      const result = await listTodoController.handle();

      expect(result).to.be.eql({
        data: fakeResponse,
      });
      assert(container.listTodoUseCase.load.calledOnce);
    });
  });

  describe('#exception', () => {
    it('should return error', () => {
      const error = new Error();
      // @ts-ignore
      const listTodoController = new ListTodoController();
      const result = listTodoController.exception(error);

      expect(result).to.be.eql(error);
    });
  });
});
