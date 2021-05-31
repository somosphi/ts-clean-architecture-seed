import { DependencyContainer, InjectionToken } from 'tsyringe';
import express, { Router, Request, Response, NextFunction } from 'express';
import { ListTodoController } from '../../adapters/presentation/controllers/listTodos/list-todo';
import { Module } from './modules';
import { env } from '../env';
import { Controller } from '../../adapters/presentation/controllers/controller';
import { RouteConfig } from '../../adapters/presentation/controllers/controller.config';

export class HttpServer implements Module {
  protected app: express.Application;

  constructor(private container: DependencyContainer) {}

  protected loadControllers(): Function[] {
    return [ListTodoController];
  }

  protected buildRoutes(router: Router): Router {
    this.loadControllers().forEach((controller: Function) => {
      const instance = this.container.resolve(controller as InjectionToken);

      if (!instance.routeConfigs) {
        return;
      }

      instance.routeConfigs.forEach((config: RouteConfig) => {
        const { path, middlewares, method } = config;

        const func = async (
          req: Request,
          res: Response,
          next: NextFunction
        ) => {
          const { data, statusCode } = await instance.handle(req);
          res.status(statusCode).send(data);
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

  start(): void {
    const app = express();
    const router = Router({ mergeParams: true });
    const buildedRoutes = this.buildRoutes(router);

    app.use(buildedRoutes);
    app.listen(env.httpPort, () =>
      console.log(`Server running on http://localhost:${env.httpPort}`)
    );
    this.app = app;
  }
}
