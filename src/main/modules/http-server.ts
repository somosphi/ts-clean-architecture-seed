import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';
import compression from 'compression';
import { DependencyContainer, InjectionToken } from 'tsyringe';
import express, { Router, Request, Response, NextFunction } from 'express';
import { logger } from '../../logger';
import { Module } from './modules';
import { env } from '../env';
import { RouteConfig } from '../../presentation/controllers/controller.config';
import { HttpResponse } from '../../presentation/ports/http';
import { errorHandlerMiddleware } from '../../presentation/middleware.ts/error-handler';
import {
  ListUsersByIdController,
  ListUsersController,
} from '../../presentation/controllers';

export class HttpServer implements Module {
  protected app: express.Application;

  constructor(private container: DependencyContainer) {}

  protected loadControllers(): Function[] {
    return [ListUsersByIdController, ListUsersController];
  }

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

            if (statusCode || response.status) {
              res.status(statusCode);
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

  start(): void {
    const app = express();
    const router = Router({ mergeParams: true });
    const buildedRoutes = this.buildRoutes(router);

    app.set('trust proxy', true);
    app.use(helmet());
    app.use(cors());
    app.use(compression());
    app.use(
      bodyParser.json({
        limit: env.httpBodyLimit,
      })
    );

    app.use(buildedRoutes);
    app.use(errorHandlerMiddleware);
    app.listen(env.httpPort, () =>
      logger.info(`Server running on http://localhost:${env.httpPort}`)
    );
    this.app = app;
  }
}
