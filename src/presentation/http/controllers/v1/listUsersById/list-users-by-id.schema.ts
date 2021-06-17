import joi from 'joi';

export const list_by_id_schema = joi.object({
  params: joi.object({
    id: joi.string().required(),
  }),
});
