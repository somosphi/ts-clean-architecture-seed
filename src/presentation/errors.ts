import { CodedError } from '@/shared/coded-error';

export class BadRequest extends CodedError {
  constructor(code: string, message: string, details?: Record<string, any>) {
    super(code, message, details, 400);
  }
}
