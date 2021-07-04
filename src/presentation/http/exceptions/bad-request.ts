import { HttpError } from '@/presentation/http/exceptions/http-error';

export class BadRequest extends HttpError {
  constructor(code: string, message: string, details?: Record<string, any>) {
    super(code, message, 404, details);
  }
}
