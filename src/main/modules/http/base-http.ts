import { DependencyContainer, InjectionToken } from 'tsyringe';
import { Router, Request, Response, NextFunction } from 'express';
import { RouteConfig } from '@/presentation/http/controllers/controller.config';
import { HttpResponse } from '@/presentation/http/ports/http';

export abstract class BaseHttp {
  constructor(private container: DependencyContainer) {}

  protected abstract loadControllers(): Function[];

  protected buildRoutes(router: Router): Router {
    this.loadControllers().forEach((controller: Function) => {
      const instance = this.container.resolve(controller as InjectionToken);

      if (!instance.routeConfigs) {
        return;
      }

      instance.routeConfigs.forEach((config: RouteConfig) => {
        const { path, middlewares, method, statusCode } = config;

        const func = async (
          req: Request,
          res: Response,
          next: NextFunction
        ) => {
          try {
            const response = (await instance.handle(req)) as HttpResponse;
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
          } catch (err) {
            const error = instance.exception(err);

            next(error);
          }
        };

        const jobs = [...middlewares, func] as any;

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
