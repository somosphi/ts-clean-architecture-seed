import { container } from 'tsyringe';
import { ListTodoUseCase } from '../core/useCases/listTodos/list-todos';
import { TodoRepository } from './repositories/todo';

container.register('ListTodoUseCase', ListTodoUseCase);
container.register('TodoRepository', TodoRepository);

export default container;
