export interface ILoginByUsernameUseCase {
  login(username: string): Promise<string>;
}
