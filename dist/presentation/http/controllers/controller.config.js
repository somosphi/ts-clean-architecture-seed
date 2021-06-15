"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.version = exports.httpStatus = exports.del = exports.patch = exports.put = exports.post = exports.get = void 0;
const createRouteDecorator = (method) => function (path, middlewares = []) {
    return function (constructor) {
        const { statusCode } = constructor.prototype;
        if (!constructor.prototype.routeConfigs) {
            constructor.prototype.routeConfigs = [
                {
                    path,
                    method,
                    middlewares,
                    statusCode,
                },
            ];
        }
    };
};
exports.get = createRouteDecorator('get');
exports.post = createRouteDecorator('post');
exports.put = createRouteDecorator('put');
exports.patch = createRouteDecorator('patch');
exports.del = createRouteDecorator('delete');
const httpStatus = function (statusCode) {
    return function (target, propertyKey, descriptor) {
        target.statusCode = statusCode;
    };
};
exports.httpStatus = httpStatus;
const version = function (version) {
    return function (constructor) {
        const { routeConfigs } = constructor.prototype;
        for (const iterator of routeConfigs) {
            if (version) {
                if (version.indexOf('/') > -1) {
                    iterator.path = version + iterator.path;
                }
                else {
                    throw new Error('Decorator version need "/" to work.');
                }
            }
        }
    };
};
exports.version = version;
