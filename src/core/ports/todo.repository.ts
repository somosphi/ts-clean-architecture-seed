import { TodoEntity } from '../entities/todo';
import { SaveTodoDTO } from '../useCases/saveTodo/save-todo.dto';

export interface ITodoRepository {
  all(): Promise<TodoEntity[]>;
  create(data: SaveTodoDTO): Promise<string>;
}
