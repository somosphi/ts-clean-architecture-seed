import { User } from '../entities/user';

export interface IUserRepository {
  all(): Promise<User[]>;
  getById(id: string): Promise<User | undefined>;
}
