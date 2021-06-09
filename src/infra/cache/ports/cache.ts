export interface Cache {
  get(key: string): Promise<string | null>;
  set(key: string, value: any): Promise<void>;
  setWithExpirationTime(
    key: string,
    value: any,
    expirationTime: number
  ): Promise<void>;
}
