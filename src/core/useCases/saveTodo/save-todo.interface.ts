import { TodoEntity } from '../../entities/todo';
import { SaveTodoDTO } from './save-todo.dto';

export interface ISaveTodoUseCase {
  save(data: SaveTodoDTO): Promise<TodoEntity>;
}
