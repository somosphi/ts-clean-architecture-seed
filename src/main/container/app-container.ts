import { container } from 'tsyringe';
import { ListUsersUseCase } from '@/core/useCases/listUsers/list-users';
import { ListUsersByIdUseCase } from '@/core/useCases/listUsersById/list-users-by-id';
import { UserRepository } from '@/infra/repositories/user';
import { HttpService } from '@/infra/http/http.service';
import { JsonPlaceHolderIntegration } from '@/infra/http/integrations';
import { KnexConnection } from '@/infra/db/knex';
import { BaseContainer } from './config/base';
import { LogUserInfoProducer } from '@/infra/amqp/producers/logUserInfo/log-user-info';
import { FetchUsersUseCase } from '@/core/useCases/fetchUsers/fetch-users';

class AppContainer extends BaseContainer {
  loadProviders(): Function[] {
    return [
      HttpService,
      JsonPlaceHolderIntegration,
      ListUsersUseCase,
      ListUsersByIdUseCase,
      UserRepository,
      LogUserInfoProducer,
      FetchUsersUseCase,
    ];
  }

  loadConfigs(): any {
    return {
      mysqlDatabase: new KnexConnection().getConnection(),
    };
  }
}

export default new AppContainer(container).getContainer();
