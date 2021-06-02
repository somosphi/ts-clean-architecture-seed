import { injectable, inject } from 'tsyringe';
import { IListUsersUseCase } from './list-users.interface';
import { User } from '../../entities/user';
import { IUserRepository } from '../../ports/user.repository';

@injectable()
export class ListUsersUseCase implements IListUsersUseCase {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository
  ) {}

  async list(): Promise<User[]> {
    return this.userRepository.all();
  }
}
