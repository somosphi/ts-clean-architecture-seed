import { injectable, inject } from 'tsyringe';
import { Post } from '../controller.config';
import { Controller } from '../controller';
import { HttpResponse, HttpRequest } from '../../ports/http';
import { SaveTodoDTO } from '../../../core/useCases/saveTodo/save-todo.dto';
import { SaveTodoResponse } from './save-todo.response';
import { ISaveTodoUseCase } from '../../../core/useCases/saveTodo/save-todo.interface';

@Post('/todos')
@injectable()
export class ListTodoController extends Controller {
  constructor(
    @inject('SaveTodoUseCase') private saveTodoUseCase: ISaveTodoUseCase
  ) {
    super();
  }

  async handle(req: HttpRequest): Promise<HttpResponse<SaveTodoResponse>> {
    const body = req.body as SaveTodoDTO;
    const todo = await this.saveTodoUseCase.save(body);
    return {
      data: todo,
      statusCode: 201,
    };
  }
}
