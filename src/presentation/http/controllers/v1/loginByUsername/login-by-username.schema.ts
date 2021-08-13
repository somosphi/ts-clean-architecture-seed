import Joi from 'joi';

export const authScheama = Joi.object({
  body: Joi.object({
    usename: Joi.string().required(),
  }),
});
