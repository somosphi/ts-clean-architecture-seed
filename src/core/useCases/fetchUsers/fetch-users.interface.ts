export interface IFetchUsersUseCase {
  fetchUsers(): Promise<string[]>;
}
