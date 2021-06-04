import { injectable, inject } from 'tsyringe';
import { Controller } from '../controller';
import {  HttpResponse } from '../../ports/http';
import { get, httpStatus } from '../controller.config';
import { IListUsersUseCase } from '../../../core/useCases/listUsers/list-users.interface';
import { ListUsersResponse } from './list-users.response';
import { User } from '../../../core/entities/user';

@get('/users')
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
