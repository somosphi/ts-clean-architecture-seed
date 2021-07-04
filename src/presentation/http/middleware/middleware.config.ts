import { HttpRequest, HttpResponse } from "@/presentation/http/ports/http";

export interface Middleware {
  handle(req: HttpRequest, error: Error): HttpResponse;
}