import 'reflect-metadata';
import sinon from 'sinon';
import { expect, assert } from 'chai';
import { Status } from '../../../core/enum';
import { SaveTodoResponse } from './save-todo.response';
import { SaveTodoController } from './save-todo';
import { HttpRequest } from '../../ports/http';
import { TodoAlreadyExistsError } from '../../../core/errors';
import { BadRequest } from '../../errors';

describe('SaveTodoController', () => {
  describe('#handle', () => {
    it('should return SaveTodoResponse', async () => {
      const reqMock: HttpRequest = {
        body: {
          title: 'string',
          description: 'string',
        },
        params: {},
      };

      const fakeResponse: SaveTodoResponse = {
        description: '',
        id: '',
        status: Status.Done,
        title: '',
      };

      const saveTodoUseCaseFake = {
        save: sinon.fake.resolves(fakeResponse),
      };

      const container = {
        saveTodoUseCase: saveTodoUseCaseFake,
      };
      const saveTodoController = new SaveTodoController(
        // @ts-ignore
        ...Object.values(container)
      );

      const result = await saveTodoController.handle(reqMock);

      expect(result).to.be.eql({
        data: fakeResponse,
      });
      assert(container.saveTodoUseCase.save.calledOnceWith(reqMock.body));
    });
  });
  
  describe('#exception', () => {
    it('should return error', () => {
      const error = new Error();
      // @ts-ignore
      const saveTodoController = new SaveTodoController();
      const result = saveTodoController.exception(error);

      expect(result).to.be.instanceOf(Error);
    });

    it('should return TodoAlreadyExistsError', () => {
      const error = new TodoAlreadyExistsError();
      // @ts-ignore
      const saveTodoController = new SaveTodoController();
      const result = saveTodoController.exception(error);

      expect(result).to.be.instanceOf(BadRequest);
    });
  });
});
