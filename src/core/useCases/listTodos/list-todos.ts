import { injectable, inject } from 'tsyringe';
import { ITodoRepository } from '../../ports/todo.repository';
import { IListTodoUseCase } from './list-todos.interface';
import { TodoEntity } from '../../entities/todo';

@injectable()
export class ListTodoUseCase implements IListTodoUseCase {
  constructor(
    @inject('TodoRepository') private todoRepository: ITodoRepository
  ) {}

  load(): Promise<TodoEntity[]> {
    return this.todoRepository.all();
  }
}
