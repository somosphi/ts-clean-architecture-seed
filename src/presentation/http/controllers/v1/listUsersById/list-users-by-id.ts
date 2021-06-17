import { injectable, inject } from 'tsyringe';
import { httpStatus, get, version } from '../../controller.config';
import { Controller } from '../../controller';
import { HttpRequest, HttpResponse } from '../../../ports/http';
import { IListUsersByIdUseCase } from '../../../../../core/useCases/listUsersById/list-users-by-id.interface';
import { ListUsersByIdResponse } from './list-users-by-id.response';
import { UserNotFoundError } from '../../../../../core/errors';
import { BadRequest } from '../../../errors';
import { validator_middleware } from '../../../middleware/validator-schema';
import { list_by_id_schema } from './list-users-by-id.schema';

@version('/v1')
@get('/users/:id', [validator_middleware(list_by_id_schema)])
@injectable()
export class ListUsersByIdController extends Controller {
  constructor(
    @inject('ListUsersByIdUseCase')
    private list_users_by_id_use_case: IListUsersByIdUseCase
  ) {
    super();
  }

  @httpStatus(200)
  async handle(req: HttpRequest): Promise<HttpResponse<ListUsersByIdResponse>> {
    const { id } = req.params;
    const user = await this.list_users_by_id_use_case.listById(id);

    return {
      data: {
        ...user,
        created_at: user.created_at.toISOString(),
        updated_at: user.updated_at.toISOString(),
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
