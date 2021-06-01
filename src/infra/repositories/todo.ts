import { ITodoRepository } from '../../core/ports/todo.repository';
import { TodoEntity } from '../../core/entities/todo';
import { Status } from '../../core/enum';
import { SaveTodoDTO } from '../../core/useCases/saveTodo/save-todo.dto';
import { injectable } from 'tsyringe';

const todos: TodoEntity[] = [
  {
    id: '1',
    title: 'Test',
    description: 'test',
    status: Status.Done,
  },
];

@injectable()
export class TodoRepository implements ITodoRepository {
  all(): Promise<TodoEntity[]> {
    return Promise.resolve(todos);
  }

  create(data: SaveTodoDTO): Promise<string> {
    return Promise.resolve('1');
  }

  getByTitle(title: string): Promise<TodoEntity> {
    const [todo] = todos;
    return Promise.resolve(todo);
  }
}
