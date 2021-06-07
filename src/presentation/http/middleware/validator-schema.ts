import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { BadRequest } from '../errors';
import { logger } from '../../../logger';

export const validatorMiddleware = (schema: Joi.Schema) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validation = schema.validate(req, {
    abortEarly: false,
    stripUnknown: true,
    allowUnknown: true,
  });

  if (validation.error) {
    logger.info(req?.body);
    logger.info(req?.params);
    logger.info(req?.query);
    return next(
      new BadRequest(
        'VALIDATION_FAILED',
        'Invalid request data',
        validation.error.details
      )
    );
  }

  Object.assign(req, validation.value);

  return next();
};
