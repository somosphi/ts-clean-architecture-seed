import joi from 'joi';

export const listByIdSchema = joi.object({
  params: joi.object({
    id: joi.string().required(),
  }),
});
