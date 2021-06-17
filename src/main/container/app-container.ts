import { container } from 'tsyringe';
import { UserRepository } from '@/infra/repositories/user';
import { HttpService } from '@/infra/http/http.service';
import { JsonPlaceHolderIntegration } from '@/infra/http/integrations';
import { KnexConnection } from '@/infra/db/knex';
import { LogUserInfoProducer } from '@/infra/amqp/producers/logUserInfo/log-user-info';
import {
  FetchUsersUseCase,
  ListUsersByIdUseCase,
  ListUsersUseCase,
} from '@/core/useCases';
import { BaseContainer } from './config/base';

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
      mysql_database: new KnexConnection().getConnection(),
    };
  }
}

export default new AppContainer(container).getContainer();
