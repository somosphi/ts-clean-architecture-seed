export interface IUserCache {
  getUserEmailAddress(id: number): Promise<string | null>;
  setUserEmailAddress(id: number, emailAddress: string): Promise<void>;
}
