import { HttpRequest, HttpResponse } from "../ports/http";

export interface Middleware {
  handle(req: HttpRequest, error: Error): HttpResponse;
}