export type HttpRequest = {
  body: any;
  params: any;
  query?: any;
  headers?: any;
};

export type HttpResponse<T = any> = {
  data?: T;
  headers?: any;
  status?: number;
};
