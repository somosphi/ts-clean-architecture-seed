import { container, DependencyContainer } from 'tsyringe';
import { ListUsersUseCase } from '../core/useCases/listUsers/list-users';
import { ListUsersByIdUseCase } from '../core/useCases/listUsersById/list-users-by-id';
import { UserRepository } from '../infra/repositories/user';

class AppContainer {
  constructor(private readonly container: DependencyContainer) {
    this.loadProviders().forEach(providers => {
      this.container.register(providers.name, providers as any);
    });
  }

  private loadProviders(): Function[] {
    return [ListUsersUseCase, ListUsersByIdUseCase, UserRepository];
  }

  getContainer(): DependencyContainer {
    return this.container;
  }
}

export default new AppContainer(container).getContainer();
