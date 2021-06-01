import { container, DependencyContainer, ValueProvider } from 'tsyringe';
import { ListTodoUseCase } from '../core/useCases/listTodos/list-todos';
import { TodoRepository } from './repositories/todo';

class AppContainer {
  constructor(private readonly container: DependencyContainer) {
    this.loadProviders().forEach(providers => {
      this.container.register(providers.name, providers as any);
    });
  }

  private loadProviders(): Function[] {
    return [ListTodoUseCase, TodoRepository];
  }

  getContainer(): DependencyContainer {
    return this.container;
  }
}

export default new AppContainer(container).getContainer();
