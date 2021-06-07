import { Request, Response, NextFunction } from 'express';
import { CodedError } from '@/shared/coded-error';
import { logger } from '@/logger';

export const errorHandlerMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CodedError) {
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
