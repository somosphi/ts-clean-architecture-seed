import { RouteConfig } from './controller.config';
import { HttpRequest, HttpResponse } from '../ports/http';

export abstract class Controller {
  abstract handle(req: HttpRequest): Promise<HttpResponse | void>;

  abstract exception(error: unknown): Error;

  path?: string;

  route_configs?: RouteConfig[];
}
