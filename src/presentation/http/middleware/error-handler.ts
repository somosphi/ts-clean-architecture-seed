import { Request, Response, NextFunction } from 'express';
import { __ } from 'i18n';
import { logger } from '@/logger';
import { HttpError } from '../errors';

export const errorHandlerMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof HttpError) {
    logger.error(err);
    const { statusCode, message, code, details } = err;

    res.status(statusCode || 200).send({
      code,
      message,
      details,
    });
    return next();
  }

  if (err.code && err.code === 'ER_DUP_ENTRY') {
    res.status(409).send({
      code: 'DUPLICATED_RESOURCE',
      message: __('error.duplicatedResource'),
    });
    return next();
  }

  res.status(500).send({
    code: 'UNEXPECTED_ERROR',
    message: __('error.unexpected'),
  });

  return next();
};
