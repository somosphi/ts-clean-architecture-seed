import { User } from '../../entities/user';

export interface IListUsersByIdUseCase {
  listById(id: string): Promise<User>;
}
