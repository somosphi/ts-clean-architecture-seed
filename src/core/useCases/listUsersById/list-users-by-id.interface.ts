import { User } from '@/core/entities/user';

export interface IListUsersByIdUseCase {
  listById(id: string): Promise<User>;
}
