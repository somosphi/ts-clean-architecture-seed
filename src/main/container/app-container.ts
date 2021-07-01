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

export class AppContainer extends BaseContainer {
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
