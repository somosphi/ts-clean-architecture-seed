import Joi from 'joi';

export const findUserSchema = Joi.object({
  id: Joi.string().required(),
});
