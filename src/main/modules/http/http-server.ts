import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';
import compression from 'compression';
import { DependencyContainer } from 'tsyringe';
import express, { Router } from 'express';
import { logger } from '@/logger';
import { Module } from '@/main/modules/modules';
import { env } from '@/main/env';
import { error_handler_middleware } from '@/presentation/http/middleware/error-handler';
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
    const builded_routes = this.buildRoutes(router);

    app.set('trust proxy', true);
    app.use(helmet());
    app.use(cors());
    app.use(compression());
    app.use(
      bodyParser.json({
        limit: env.http_body_limit,
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

    app.use(builded_routes);

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

    app.use(error_handler_middleware);
    app.listen(env.http_port, () =>
      logger.info(`Server running on http://localhost:${env.http_port}`)
    );
    this.app = app;
  }
}
