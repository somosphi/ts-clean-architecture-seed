import { injectable, inject } from 'tsyringe';
import { SaveTodoDTO } from './save-todo.dto';
import { ITodoRepository } from '../../ports/todo.repository';
import { Status } from '../../enum';
import { TodoEntity } from '../../entities/todo';
import { ISaveTodoUseCase } from './save-todo.interface';

@injectable()
export class SaveTodoUseCase implements ISaveTodoUseCase {
  constructor(
    @inject('TodoRepository') private todoRepository: ITodoRepository
  ) {}

  async save(data: SaveTodoDTO): Promise<TodoEntity> {
    const id = await this.todoRepository.create(data);
    return new TodoEntity({ ...data, id, status: Status.Done });
  }
}
