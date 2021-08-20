import { injectable, inject } from 'tsyringe';
import { Controller } from '@/presentation/http/controllers/controller';
import { HttpResponse } from '@/presentation/http/ports/http';
import {
  get,
  httpStatus,
  version,
} from '@/presentation/http/controllers/controller.config';
import { IListUsersUseCase } from '@/core/useCases/listUsers/list-users.interface';
import { ListUsersResponse } from '@/presentation/http/controllers/v1';
import { User } from '@/core/entities/user';
import { AuthMiddleware } from '@/presentation/http/middleware/auth';

@version('/v1')
@get('/users', [AuthMiddleware])
@injectable()
export class ListUsersController extends Controller {
  constructor(
    @inject('ListUsersUseCase') private listUsersUseCase: IListUsersUseCase
  ) {
    super();
  }

  @httpStatus(200)
  async handle(): Promise<HttpResponse<ListUsersResponse[]>> {
    const users = await this.listUsersUseCase.list();

    return {
      data: users.map((user: User) => ({
        ...user,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
      })),
    };
  }

  exception(error: Error): Error {
    return error;
  }
}
