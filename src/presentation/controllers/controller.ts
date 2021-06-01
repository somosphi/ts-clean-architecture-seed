import { HttpRequest, HttpExceptionResponse } from '../ports/http';
import { RouteConfig } from './controller.config';

export abstract class Controller {
  abstract handle(req: HttpRequest): Promise<any>;
  abstract exception(error: unknown): HttpExceptionResponse;
  path?: string;
  routeConfigs?: RouteConfig[];
}
