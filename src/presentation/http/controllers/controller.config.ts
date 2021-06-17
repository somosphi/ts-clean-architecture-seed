export interface RouteConfig {
  method: string;
  version: string;
  path: string;
  middlewares: Function[];
  status_code: number;
}

const createRouteDecorator = (method: string) =>
  function(path: string, middlewares: Function[] = []): Function {
    return function(constructor: Function) {
      const { status_code } = constructor.prototype;
      if (!constructor.prototype.route_configs) {
        constructor.prototype.route_configs = [
          {
            path,
            method,
            middlewares,
            status_code,
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

export const httpStatus = function(status_code: number) {
  return function(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    target.status_code = status_code;
  };
};

export const version = function(version: string): Function {
  return function(constructor: Function) {
    const { route_configs } = constructor.prototype;
    for (const iterator of route_configs) {
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
