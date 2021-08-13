export type HttpRequest = {
  body: any;
  params: any;
  query?: any;
  headers?: any;
  user?: {
    username: string;
    emailAddress: string;
    name: string;
  };
};

export type HttpResponse<T = any> = {
  data?: T;
  headers?: any;
  status?: number;
};
