import { injectable, inject } from 'tsyringe';
import { post, httpStatus } from '../controller.config';
import { Controller } from '../controller';
import { HttpRequest, HttpResponse } from '../../ports/http';
import { SaveTodoDTO } from '../../../core/useCases/saveTodo/save-todo.dto';
import { SaveTodoResponse } from './save-todo.response';
import { ISaveTodoUseCase } from '../../../core/useCases/saveTodo/save-todo.interface';
import { TodoAlreadyExistsError } from '../../../core/errors';
import { validatorMiddleware } from '../../middleware/validator-schema';
import { saveTodoSchema } from './save-todo.schema';
import { BadRequest } from '../../errors';

@post('/todos', [validatorMiddleware(saveTodoSchema)])
@injectable()
export class SaveTodoController extends Controller {
  constructor(
    @inject('SaveTodoUseCase') private saveTodoUseCase: ISaveTodoUseCase
  ) {
    super();
  }

  @httpStatus(201)
  async handle(req: HttpRequest): Promise<HttpResponse<SaveTodoResponse>> {
    const body = req.body as SaveTodoDTO;
    const todo = await this.saveTodoUseCase.save(body);

    return {
      data: todo,
    };
  }

  exception(error: Error): Error {
    if (error instanceof TodoAlreadyExistsError) {
      const { code, message } = error;
      return new BadRequest(message, code);
    }

    return error;
  }
}
