import Joi from 'joi';
import { CodedError } from '@/shared/coded-error';

export class ValidationError extends CodedError {
  constructor(details: Joi.ValidationErrorItem[]) {
    super('VALIDATION_FAILED', 'Invalid request data', details);
  }
}
