import Joi from 'joi';

export const find_user_schema = Joi.object({
  id: Joi.string().required(),
});
