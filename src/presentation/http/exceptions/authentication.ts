import { Unauthorized } from '@/presentation/http/exceptions/unauthorized';

export class AuthenticationError extends Unauthorized {
  constructor() {
    super('AUTHENTICATION_FAILED', 'Authentication failed.');
  }
}
