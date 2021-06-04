import { container, DependencyContainer } from 'tsyringe';
import { ListUsersUseCase } from '@/core/useCases/listUsers/list-users';
import { ListUsersByIdUseCase } from '@/core/useCases/listUsersById/list-users-by-id';
import { UserRepository } from '@/infra/repositories/user';
import { HttpService } from '@/infra/http/http.service';
import { JsonPlaceHolderIntegration } from '@/infra/http/integrations';

class AppContainer {
  constructor(private readonly container: DependencyContainer) {
    this.loadProviders().forEach(providers => {
      this.container.register(providers.name, providers as any);
    });
  }

  private loadProviders(): Function[] {
    return [
      HttpService,
      JsonPlaceHolderIntegration,
      ListUsersUseCase,
      ListUsersByIdUseCase,
      UserRepository,
    ];
  }

  getContainer(): DependencyContainer {
    return this.container;
  }
}

export default new AppContainer(container).getContainer();
