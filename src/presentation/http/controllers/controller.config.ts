import Joi from 'joi';

export interface RouteConfig {
  method: string;
  version: string;
  path: string;
  schema: Joi.Schema;
  middlewares: Function[];
  statusCode: number;
}

const createRouteDecorator = (method: string) =>
  function(path: string, middlewares: Function[] = []): Function {
    return function(constructor: Function) {
      const { statusCode, schema } = constructor.prototype;
      if (!constructor.prototype.routeConfigs) {
        constructor.prototype.routeConfigs = [
          {
            path,
            method,
            middlewares,
            statusCode,
            schema,
          },
        ];
      }
    };
  };

export const get = createRouteDecorator('get');

export const post = createRouteDecorator('post');

export const put = createRouteDecorator('put');

export const patch = createRouteDecorator('patch');

export const del = createRouteDecorator('delete');

export const httpStatus = function(statusCode: number) {
  return function(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    target.statusCode = statusCode;
  };
};

export const schema = function(schema: Joi.Schema) {
  return function(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    target.schema = schema;
  };
};

export const version = function(version: string): Function {
  return function(constructor: Function) {
    const { routeConfigs } = constructor.prototype;
    for (const iterator of routeConfigs) {
      if (version) {
        if (version.indexOf('/') > -1) {
          iterator.path = version + iterator.path;
        } else {
          throw new Error('Decorator version need "/" to work.');
        }
      }
    }
  };
};
