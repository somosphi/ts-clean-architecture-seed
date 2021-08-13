import { injectable } from 'tsyringe';
import { __ } from 'i18n';
import { Middleware } from '@/presentation/http/middleware/middleware.config';
import { HttpRequest, HttpResponse } from '@/presentation/http/ports/http';
import { HttpError } from '@/presentation/http/exceptions/http-error';

@injectable()
export class ErrorHandlerMiddleware implements Middleware {
  handle(req: HttpRequest, error: any): HttpResponse {
    if (error instanceof HttpError) {
      const { statusCode, message, code, details } = error;
      return {
        data: {
          code,
          message,
          details,
        },
        status: statusCode || 200,
      };
    }

    if (error?.code === 'ER_DUP_ENTRY') {
      return {
        data: {
          code: 'DUPLICATED_RESOURCE',
          message: __('error.duplicatedResource'),
        },
        status: 409,
      };
    }

    return {
      data: {
        code: 'UNEXPECTED_ERROR',
        message: __('error.unexpected'),
      },
      status: 500,
    };
  }
}
