import { injectable, inject } from 'tsyringe';
import { Controller } from '../../controller';
import { HttpResponse } from '../../../ports/http';
import { get, httpStatus, version } from '../../controller.config';
import { IListUsersUseCase } from '../../../../../core/useCases/listUsers/list-users.interface';
import { ListUsersResponse } from './list-users.response';
import { User } from '../../../../../core/entities/user';

@version('/v1')
@get('/users')
@injectable()
export class ListUsersController extends Controller {
  constructor(
    @inject('ListUsersUseCase') private list_users_use_case: IListUsersUseCase
  ) {
    super();
  }

  @httpStatus(200)
  async handle(): Promise<HttpResponse<ListUsersResponse[]>> {
    const users = await this.list_users_use_case.list();

    return {
      data: users.map((user: User) => ({
        ...user,
        created_at: user.created_at.toISOString(),
        updated_at: user.updated_at.toISOString(),
      })),
    };
  }

  exception(error: Error): Error {
    return error;
  }
}
