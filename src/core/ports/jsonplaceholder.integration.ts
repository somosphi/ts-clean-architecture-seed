import { User } from '../entities/user';

export interface IJsonPlaceHolderIntegration {
  getUsers(): Promise<User[]>;
}
