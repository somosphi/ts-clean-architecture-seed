export interface Cache {
  get(key: string): Promise<string | null>;
  set(key: string, value: any): Promise<void>;
  setWithExpirationTime(
    key: string,
    value: any,
    expiration_time: number
  ): Promise<void>;
}
