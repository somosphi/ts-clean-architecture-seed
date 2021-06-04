export interface Http {
  get<T = any, R = HttpResponse<T>>(
    url: string,
    config?: HttpConfig
  ): Promise<R>;
  post<T = any, R = HttpResponse<T>>(
    url: string,
    data?: any,
    config?: HttpConfig
  ): Promise<R>;
  delete<T = any, R = HttpResponse<T>>(
    url: string,
    config?: HttpConfig
  ): Promise<R>;
  patch<T = any, R = HttpResponse<T>>(
    url: string,
    data?: any,
    config?: HttpConfig
  ): Promise<R>;

  createInstance(confg: HttpConfig): void;
}

export interface HttpConfig {
  url?: string;
  method?: string;
  baseURL?: string;
  headers?: {};
  params?: string;
  data?: string;
  timeout?: number;
}

export interface HttpResponse<T> {
  data: T;
  status: number;
  statusText: string;
  headers: any;
  config: any;
  request?: any;
}
