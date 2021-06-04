import {
  HttpRequest,
  HttpResponse,
} from '../ports/http';
import { RouteConfig } from './controller.config';

export abstract class Controller {
  abstract handle(req: HttpRequest): Promise<HttpResponse | void>;
  abstract exception(error: unknown): Error;
  path?: string;
  routeConfigs?: RouteConfig[];
}
