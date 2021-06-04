import { injectable, inject } from 'tsyringe';
import { httpStatus, get } from '../controller.config';
import { Controller } from '../controller';
import { HttpRequest, HttpResponse } from '../../ports/http';
import { IListUsersByIdUseCase } from '../../../core/useCases/listUsersById/list-users-by-id.interface';
import { ListUsersByIdResponse } from './list-users-by-id.response';
import { UserNotFoundError } from '../../../core/errors';
import { BadRequest } from '../../errors';
import { validatorMiddleware } from '../../middleware/validator-schema';
import { listByIdSchema } from './list-users-by-id.schema';

@get('/users/:id', [validatorMiddleware(listByIdSchema)])
@injectable()
export class ListUsersByIdController extends Controller {
  constructor(
    @inject('ListUsersByIdUseCase')
    private listUsersByIdUseCase: IListUsersByIdUseCase
  ) {
    super();
  }

  @httpStatus(200)
  async handle(req: HttpRequest): Promise<HttpResponse<ListUsersByIdResponse>> {
    const id = req.params.id;
    const user = await this.listUsersByIdUseCase.listById(id);

    return {
      data: {
        ...user,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
      },
    };
  }

  exception(error: Error): Error {
    if (error instanceof UserNotFoundError) {
      const { code, message } = error;
      return new BadRequest(message, code);
    }

    return error;
  }
}
