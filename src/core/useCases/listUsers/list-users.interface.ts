import { User } from '../../entities/user';

export interface IListUsersUseCase {
  list(): Promise<User[]>;
}
