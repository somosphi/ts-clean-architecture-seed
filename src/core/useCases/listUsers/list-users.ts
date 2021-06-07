import { injectable, inject } from 'tsyringe';
import { IListUsersUseCase } from '@/core/useCases/listUsers/list-users.interface';
import { User } from '@/core/entities/user';
import { IUserRepository } from '@/core/ports/user.repository';

@injectable()
export class ListUsersUseCase implements IListUsersUseCase {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository
  ) {}

  async list(): Promise<User[]> {
    return this.userRepository.all();
  }
}
