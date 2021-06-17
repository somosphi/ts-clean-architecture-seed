import { injectable, inject } from 'tsyringe';
import { IListUsersByIdUseCase } from '@/core/useCases/listUsersById/list-users-by-id.interface';
import { User } from '@/core/entities/user';
import { IUserRepository } from '@/core/ports/user.repository';
import { UserNotFoundError } from '@/core/errors';

@injectable()
export class ListUsersByIdUseCase implements IListUsersByIdUseCase {
  constructor(
    @inject('UserRepository') private user_repository: IUserRepository
  ) {}

  async listById(id: string): Promise<User> {
    const user = await this.user_repository.getById(id);

    if (!user) {
      throw new UserNotFoundError();
    }

    return user;
  }
}
