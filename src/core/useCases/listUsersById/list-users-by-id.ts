import { IListUsersByIdUseCase } from './list-users-by-id.interface';
import { User } from '../../entities/user';
import { injectable, inject } from 'tsyringe';
import { IUserRepository } from '../../ports/user.repository';
import { UserNotFoundError } from '../../errors';

@injectable()
export class ListUsersByIdUseCase implements IListUsersByIdUseCase {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository
  ) {}

  async listById(id: string): Promise<User> {
    const user = await this.userRepository.getById(id);

    if (!user) {
      throw new UserNotFoundError();
    }

    return user;
  }
}
