import Joi from 'joi';

export const saveTodoSchema = Joi.object({
  body: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
  }),
});
