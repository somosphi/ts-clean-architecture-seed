import { container, DependencyContainer } from 'tsyringe';
import { ListTodoUseCase } from '../core/useCases/listTodos/list-todos';
import { TodoRepository } from '../infra/repositories/todo';
import { SaveTodoUseCase } from '../core/useCases/saveTodo/save-todo';

class AppContainer {
  constructor(private readonly container: DependencyContainer) {
    this.loadProviders().forEach(providers => {
      this.container.register(providers.name, providers as any);
    });
  }

  private loadProviders(): Function[] {
    return [ListTodoUseCase, TodoRepository, SaveTodoUseCase];
  }

  getContainer(): DependencyContainer {
    return this.container;
  }
}

export default new AppContainer(container).getContainer();
