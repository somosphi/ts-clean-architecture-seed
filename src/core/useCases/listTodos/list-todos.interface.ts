import { TodoEntity } from '../../entities/todo';

export interface IListTodoUseCase {
  load(): Promise<TodoEntity[]>;
}
