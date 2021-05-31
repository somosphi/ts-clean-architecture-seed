import { HttpResponse, HttpRequest } from '../ports/http';

export interface Controller {
  handle: (req: HttpRequest) => Promise<HttpResponse>;
}
