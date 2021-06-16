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
    logger.debug(req?.body);
    logger.debug(req?.params);
    logger.debug(req?.query);
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
