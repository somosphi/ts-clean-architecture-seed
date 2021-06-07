import { User } from '@/core/entities/user';

export interface IUserRepository {
  all(): Promise<User[]>;
  getById(id: string): Promise<User | null>;
}
