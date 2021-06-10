import { CodedError } from '@/shared/coded-error';

export class HttpError extends CodedError {
  statusCode: number;

  constructor(
    code: string,
    message: string,
    statusCode: number,
    details?: Record<string, any>
  ) {
    super(code, message, details);
    this.statusCode = statusCode;
  }
}

export class BadRequest extends HttpError {
  constructor(code: string, message: string, details?: Record<string, any>) {
    super(code, message, 400, details);
  }
}

export class NotFoundError extends HttpError {
  constructor() {
    super('NOT_FOUND', 'Page not found', 404);
  }
}
