import { DependencyContainer, InjectionToken } from 'tsyringe';
import {
  Router,
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from 'express';
import Joi from 'joi';
import { RouteConfig } from '@/presentation/http/controllers/controller.config';
import { HttpResponse, HttpRequest } from '@/presentation/http/ports/http';
import { ErrorHandlerMiddleware } from '@/presentation/http/middleware/error-handler';
import { logger } from '@/logger';
import { BadRequest } from '@/presentation/http/exceptions';
import { Controller } from '@/presentation/http/controllers/controller';
import { Middleware } from '@/presentation/http/middleware/middleware.config';

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
        const { path, middlewares, method, statusCode, schema } = config;

        const requestValidator = this.requestValidator(schema);
        const func = this.requestHandle(instance, statusCode);

        const funcMiddleware: RequestHandler[] = this.buildMiddlewares(
          middlewares
        );

        const jobs = schema
          ? ([...funcMiddleware, requestValidator, func] as any)
          : ([...funcMiddleware, func] as any);

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

  private requestHandle(
    instance: Controller,
    statusCode?: number
  ): RequestHandler {
    return async (req: Request, res: Response, next: NextFunction) => {
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
  }

  private buildMiddlewares(middlewares: Function[]): RequestHandler[] {
    return middlewares.map(middleware => {
      const instanceMiddleware = this.container.resolve(
        middleware as InjectionToken
      ) as Middleware;

      return async (req: Request, res: Response, next: NextFunction) => {
        try {
          await instanceMiddleware.handle(req);
          next();
        } catch (err) {
          logger.error(err);
          next(err);
        }
      };
    });
  }

  private requestValidator(schema?: Joi.Schema): RequestHandler | void {
    if (!schema) return undefined;
    return (req: Request, res: Response, next: NextFunction) => {
      const validation = schema.validate(req, {
        abortEarly: false,
        stripUnknown: true,
        allowUnknown: true,
      });

      if (validation.error) {
        logger.debug(req?.body);
        logger.debug(req?.params);
        logger.debug(req?.query);
        return next(
          new BadRequest(
            'VALIDATION_FAILED',
            'Invalid request data',
            validation.error.details
          )
        );
      }

      Object.assign(req, validation.value);

      return next();
    };
  }

  protected errorHandler(): unknown {
    const errorHandler = this.container.resolve<ErrorHandlerMiddleware>(
      ErrorHandlerMiddleware
    );

    return (err: any, req: HttpRequest, res: Response, next: NextFunction) => {
      const { data, status } = errorHandler.handle(req, err);
      res.status(status!).send(data);
      return next();
    };
  }
}
