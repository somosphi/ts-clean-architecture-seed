import { DependencyContainer, InjectionToken } from 'tsyringe';
import { Router, Request, Response, NextFunction } from 'express';
import { RouteConfig } from '@/presentation/http/controllers/controller.config';
import { HttpResponse } from '@/presentation/http/ports/http';

export abstract class BaseHttp {
  constructor(protected container: DependencyContainer) {}

  protected abstract loadControllers(): Function[];

  protected buildRoutes(router: Router): Router {
    this.loadControllers().forEach((controller: Function) => {
      const instance = this.container.resolve(controller as InjectionToken);

      if (!instance.route_configs) {
        return;
      }

      instance.route_configs.forEach((config: RouteConfig) => {
        const { path, middlewares, method, status_code } = config;

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
            const http_status = status_code || response.status;
            if (http_status) {
              res.status(http_status);
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
