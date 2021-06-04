import { injectable, inject } from 'tsyringe';
import { IListUsersUseCase } from '@/core/useCases/listUsers/list-users.interface';
import { User } from '@/core/entities/user';
import { IJsonPlaceHolderIntegration } from '@/core/ports/jsonplaceholder.integration';

@injectable()
export class ListUsersUseCase implements IListUsersUseCase {
  constructor(
    @inject('JsonPlaceHolderIntegration')
    private jsonPlaceHolderIntegration: IJsonPlaceHolderIntegration
  ) {}

  async list(): Promise<User[]> {
    return this.jsonPlaceHolderIntegration.getUsers();
  }
}
