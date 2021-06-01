import { injectable, inject } from 'tsyringe';
import { post, httpStatus } from '../controller.config';
import { Controller } from '../controller';
import { HttpRequest, HttpExceptionResponse } from '../../ports/http';
import { SaveTodoDTO } from '../../../core/useCases/saveTodo/save-todo.dto';
import { SaveTodoResponse } from './save-todo.response';
import { ISaveTodoUseCase } from '../../../core/useCases/saveTodo/save-todo.interface';
import { TodoAlreadyExistsError } from '../../../core/errors';

@post('/todos')
@injectable()
export class SaveTodoController extends Controller {
  constructor(
    @inject('SaveTodoUseCase') private saveTodoUseCase: ISaveTodoUseCase
  ) {
    super();
  }

  @httpStatus(201)
  async handle(req: HttpRequest): Promise<SaveTodoResponse> {
    const body = req.body as SaveTodoDTO;
    const todo = await this.saveTodoUseCase.save(body);

    return todo;
  }

  exception(error: unknown): HttpExceptionResponse {
    if (error instanceof TodoAlreadyExistsError) {
      const { code, message } = error;

      return {
        code,
        message,
        statusCode: 400,
      };
    }

    return {
      code: 'UNEXPECTED_ERROR',
      message: 'Internal server error',
      statusCode: 500,
    };
  }
}
