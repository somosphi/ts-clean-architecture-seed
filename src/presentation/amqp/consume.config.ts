import Joi from 'joi';

export const queue = function(queue: string): Function {
  return function(constructor: Function) {
    constructor.prototype.queue = queue;
  };
};

export const schema = function(schema: Joi.ObjectSchema<any>): Function {
  return function(target: any) {
    target.schema = schema;
  };
};
