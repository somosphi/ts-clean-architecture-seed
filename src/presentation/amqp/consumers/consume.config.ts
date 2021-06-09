import Joi from 'joi';

export const queue = function (queue: string): Function {
  return function (constructor: Function) {
    constructor.prototype.queue = queue;
  };
};

export const validationSchema = function (
    schema: Joi.ObjectSchema<any>
): Function {
  return function (
    target: any,
  ) {
    target['schema'] = schema;
  };
};
