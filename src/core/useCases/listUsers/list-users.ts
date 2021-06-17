import { injectable, inject } from 'tsyringe';
import { IListUsersUseCase } from '@/core/useCases/listUsers/list-users.interface';
import { User } from '@/core/entities/user';
import { IUserRepository } from '@/core/ports/user.repository';

@injectable()
export class ListUsersUseCase implements IListUsersUseCase {
  constructor(
    @inject('UserRepository') private user_repository: IUserRepository
  ) {}

  async list(): Promise<User[]> {
    return this.user_repository.all();
  }
}
