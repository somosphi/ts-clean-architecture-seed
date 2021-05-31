import { HttpResponse, HttpRequest } from '../ports/http';
import { RouteConfig } from './controller.config';

export abstract class Controller {
  abstract handle(req: HttpRequest): Promise<HttpResponse>;
  path?: string;
  routeConfigs?: RouteConfig[];
}
