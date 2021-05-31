export interface RouteConfig {
  method: string;
  path: string;
  middlewares: Function[];
}

const createRouteDecorator = (method: string) =>
  function (path: string, middlewares: Function[] = []): Function {
    return function (constructor: Function) {
      if (!constructor.prototype.routeConfigs) {
        constructor.prototype.routeConfigs = [
          {
            path,
            method,
            middlewares,
          },
        ];
      }
    };
  };

// tslint:disable-next-line:variable-name
export const Get = createRouteDecorator('get');

// tslint:disable-next-line:variable-name
export const Post = createRouteDecorator('post');

// tslint:disable-next-line:variable-name
export const Put = createRouteDecorator('put');

// tslint:disable-next-line:variable-name
export const Patch = createRouteDecorator('patch');

// tslint:disable-next-line:variable-name
export const Delete = createRouteDecorator('delete');
