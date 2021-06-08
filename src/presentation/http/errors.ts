import { CodedError } from '@/shared/coded-error';

export class BadRequest extends CodedError {
  constructor(code: string, message: string, details?: Record<string, any>) {
    super(code, message, 400,details);
  }
}

export class NotFoundError extends CodedError {
  constructor() {
    super('NOT_FOUND', 'Page not found', 404);
  }
}
