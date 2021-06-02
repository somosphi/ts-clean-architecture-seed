import { inject, singleton } from 'tsyringe';
import { IListTodoUseCase } from '../../core/useCases/listTodos/list-todos.interface';
import { logger } from '../../logger';
import { WorkerCronJob } from './job';

@singleton()
export class ListTodosJob extends WorkerCronJob {
  constructor(
    @inject('ListTodoUseCase') private listTodoUseCase: IListTodoUseCase
  ) {
    super('*/5 * * * * *');
    this.name = 'List Todos Job';
  }

  protected async runTask(): Promise<void> {
    const todos = await this.listTodoUseCase.load();

    for await (const todo of todos) {
      logger.info(todo.title);
    }
  }
}
