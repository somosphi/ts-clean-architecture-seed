import helmet from 'helmet';
import bodyParser from 'body-parser';
import compression from 'compression';
import { DependencyContainer } from 'tsyringe';
import express, { Router } from 'express';
import { logger } from '@/logger';
import { Module } from '@/main/modules/modules';
import { env } from '@/main/env';
import { errorHandlerMiddleware } from '@/presentation/http/middleware/error-handler';
import {
  ListUsersByIdController,
  ListUsersController,
} from '@/presentation/http/controllers';

import { NotFoundError } from '@/presentation/http/errors';
import { BaseHttp } from '@/main/modules/http/base-http';

export class HttpServer extends BaseHttp implements Module {
  protected app: express.Application;

  constructor(container: DependencyContainer) {
    super(container);
    this.container = container;
  }

  protected loadControllers(): Function[] {
    return [ListUsersByIdController, ListUsersController];
  }

  start(): void {
    const app = express();
    const router = Router({ mergeParams: true });
    const buildedRoutes = this.buildRoutes(router);

    app.set('trust proxy', true);
    app.use(helmet());
    app.use(compression());
    app.use(
      bodyParser.json({
        limit: env.httpBodyLimit,
      })
    );

    router.get(
      ['/info', '/status'],
      async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        try {
          res.sendStatus(204);
        } catch (err) {
          next(err);
        }
      }
    );

    app.use(buildedRoutes);

    app.use(
      '*',
      (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        next(new NotFoundError());
      }
    );

    app.use(errorHandlerMiddleware);
    app.listen(env.httpPort, () =>
      logger.info(`Server running on http://localhost:${env.httpPort}`)
    );
    this.app = app;
  }
}
