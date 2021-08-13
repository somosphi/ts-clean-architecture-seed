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
