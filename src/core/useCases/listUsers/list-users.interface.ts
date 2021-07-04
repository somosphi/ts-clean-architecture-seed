import { User } from '@/core/entities/user';

export interface IListUsersUseCase {
  list(): Promise<User[]>;
}
