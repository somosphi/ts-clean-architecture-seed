"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseHttp = void 0;
class BaseHttp {
    constructor(container) {
        this.container = container;
    }
    buildRoutes(router) {
        this.loadControllers().forEach((controller) => {
            const instance = this.container.resolve(controller);
            if (!instance.routeConfigs) {
                return;
            }
            instance.routeConfigs.forEach((config) => {
                const { path, middlewares, method, statusCode } = config;
                const func = async (req, res, next) => {
                    try {
                        const response = (await instance.handle(req));
                        if (response?.headers) {
                            for (const header in response.headers) {
                                res.setHeader(header, response.headers[header]);
                            }
                        }
                        const httpStatus = statusCode || response.status;
                        if (httpStatus) {
                            res.status(httpStatus);
                        }
                        res.send(response?.data);
                    }
                    catch (err) {
                        const error = instance.exception(err);
                        next(error);
                    }
                };
                const jobs = [...middlewares, func];
                switch (method) {
                    case 'get':
                        router.get(path, jobs);
                        break;
                    case 'post':
                        router.post(path, jobs);
                        break;
                    case 'put':
                        router.put(path, jobs);
                        break;
                    case 'patch':
                        router.patch(path, jobs);
                        break;
                    case 'delete':
                        router.delete(path, jobs);
                        break;
                    default:
                        break;
                }
            });
        });
        return router;
    }
}
exports.BaseHttp = BaseHttp;
