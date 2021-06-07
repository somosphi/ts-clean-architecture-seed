import { IUserRepository } from '@/core/ports/user.repository';
import { User } from '@/core/entities/user';
import { UserSources } from '@/core/enum';
import { Repository } from './repository';

export class UserRepository
  extends Repository<User>
  implements IUserRepository {
  getTableName(): string {
    return 'user';
  }
}
