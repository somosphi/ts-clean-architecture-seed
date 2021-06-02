import { injectable, inject } from 'tsyringe';
import { Controller } from '../controller';
import { HttpResponse } from '../../ports/http';
import { get, httpStatus } from '../controller.config';
import { ListTodoResponse } from './list-todo.response';
import { IListTodoUseCase } from '../../../core/useCases/listTodos/list-todos.interface';

@get('/todos')
@injectable()
export class ListTodoController extends Controller {
  constructor(
    @inject('ListTodoUseCase') private listTodoUseCase: IListTodoUseCase
  ) {
    super();
  }

  @httpStatus(200)
  async handle(): Promise<HttpResponse<ListTodoResponse[]>> {
    const todo = await this.listTodoUseCase.load();
    return {
      data: todo,
    };
  }

  exception(error: Error): Error {
    return error;
  }
}
