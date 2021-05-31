import { DependencyContainer } from 'tsyringe';
import express, { Router, Request, Response } from 'express';
import { ListTodoController } from '../../adapters/presentation/controllers/listTodos/list-todo';
import { Module } from './modules';
import { env } from '../env';

export class HttpServer implements Module {
  protected app: express.Application;

  constructor(private container: DependencyContainer) {}
  protected loadControllers(): Function[] {
    return [ListTodoController];
  }

  start(): void {
    const app = express();
    const router = Router({ mergeParams: true });

    router.get('/todos', async (req: Request, res: Response) => {
      const controller = this.container.resolve(ListTodoController);
      const { data, statusCode } = await controller.handle();

      res.status(statusCode).send(data);
    });

    app.use(router);
    app.listen(env.httpPort, () =>
      console.log(`Server running on http://localhost:${env.httpPort}`)
    );
    this.app = app;
  }
}
