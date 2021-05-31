import { Controller } from '../controller';
import { HttpResponse } from '../../ports/http';
import { ListTodoResponse } from './list-todo.response';
import { IListTodoUseCase } from '../../../../core/useCases/listTodos/list-todos.interface';
import { injectable, inject } from 'tsyringe';
import { Get } from '../controller.config';

@Get('/todos')
@injectable()
export class ListTodoController extends Controller {
  constructor(
    @inject('ListTodoUseCase') private listTodoUseCase: IListTodoUseCase
  ) {
    super();
  }

  async handle(): Promise<HttpResponse<ListTodoResponse[]>> {
    const todo = await this.listTodoUseCase.load();
    return {
      data: todo as ListTodoResponse[],
      statusCode: 200,
    };
  }
}
