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
    const users = await this.userRepository.all();

    return users.map(user => new User(user));
  }
}
