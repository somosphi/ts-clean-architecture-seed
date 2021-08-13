import { injectable, inject } from 'tsyringe';
import {
  httpStatus,
  get,
  version,
  schema,
} from '@/presentation/http/controllers/controller.config';
import { Controller } from '@/presentation/http/controllers/controller';
import { HttpRequest, HttpResponse } from '@/presentation/http/ports/http';
import { IListUsersByIdUseCase } from '@/core/useCases';
import { ListUsersByIdResponse } from '@/presentation/http/controllers/v1/listUsersById/list-users-by-id.response';
import { UserNotFoundError } from '@/core/exceptions';
import { BadRequest } from '@/presentation/http/exceptions';
import { listByIdSchema } from '@/presentation/http/controllers/v1/listUsersById/list-users-by-id.schema';
import { AuthMiddleware } from '@/presentation/http/middleware/auth';

@version('/v1')
@get('/users/:id', [AuthMiddleware])
@injectable()
export class ListUsersByIdController extends Controller {
  constructor(
    @inject('ListUsersByIdUseCase')
    private listUsersByIdUseCase: IListUsersByIdUseCase
  ) {
    super();
  }

  @httpStatus(200)
  @schema(listByIdSchema)
  async handle(req: HttpRequest): Promise<HttpResponse<ListUsersByIdResponse>> {
    const { id } = req.params;
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
