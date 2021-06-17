import { Request, Response, NextFunction } from 'express';
import { CodedError } from '@/shared/coded-error';
import { logger } from '@/logger';
import { HttpError } from '../errors';

export const error_handler_middleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof HttpError) {
    logger.error(err);
    const { status_code, message, code, details } = err;

    res.status(status_code || 200).send({
      code,
      message,
      details,
    });
    return next();
  }

  if (err.code && err.code === 'ER_DUP_ENTRY') {
    res.status(409).send({
      code: 'DUPLICATED_RESOURCE',
      message: 'Duplicated resource',
    });
    return next();
  }

  res.status(500).send({
    code: 'UNEXPECTED_ERROR',
    message: 'Internal server failure',
  });

  return next();
};
