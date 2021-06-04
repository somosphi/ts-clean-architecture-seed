import { IUserRepository } from '@/core/ports/user.repository';
import { User } from '@/core/entities/user';
import { UserSources } from '@/core/enum';

const now = new Date();
const users: User[] = [
  {
    id: '1',
    name: 'Leanne Graham',
    username: 'Bret',
    emailAddress: 'Sincere@april.biz',
    createdAt: now,
    updatedAt: now,
    source: UserSources.JsonPlaceholder,
  },
  {
    id: '2',
    name: 'Ervin Howell',
    username: 'Antonette',
    emailAddress: 'Shanna@melissa.tv',
    createdAt: now,
    updatedAt: now,
    source: UserSources.JsonPlaceholder,
  },
];

export class UserRepository implements IUserRepository {
  all(): Promise<User[]> {
    return Promise.resolve(users);
  }

  getById(id: string): Promise<User | undefined> {
    return Promise.resolve(users.find(user => id == user.id));
  }
}
