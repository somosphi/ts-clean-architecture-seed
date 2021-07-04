import { injectable, inject } from 'tsyringe';
import { IListUsersByIdUseCase } from '@/core/useCases/listUsersById/list-users-by-id.interface';
import { User } from '@/core/entities/user';
import { IUserRepository } from '@/core/ports/user.repository';
import { UserNotFoundError } from '@/core/exceptions';

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

    return new User(user);
  }
}
