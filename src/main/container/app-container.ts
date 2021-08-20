import { UserRepository } from '@/infra/repositories/user';
import { HttpService } from '@/infra/http/http.service';
import { JsonPlaceHolderIntegration } from '@/infra/http/integrations';
import { KnexConnection } from '@/infra/db/knex';
import { LogUserInfoProducer } from '@/infra/amqp/producers/logUserInfo/log-user-info';
import {
  FetchUsersUseCase,
  ListUsersByIdUseCase,
  ListUsersUseCase,
  LoginByUsernameUseCase,
} from '@/core/useCases';
import { BaseContainer } from '@/main/container/config/base';
import { CacheService } from '@/infra/cache/cache.service';

export class AppContainer extends BaseContainer {
  loadProviders(): Function[] {
    return [
      CacheService,
      HttpService,
      JsonPlaceHolderIntegration,
      ListUsersUseCase,
      ListUsersByIdUseCase,
      UserRepository,
      LogUserInfoProducer,
      FetchUsersUseCase,
      LoginByUsernameUseCase,
    ];
  }

  loadConfigs(): any {
    return {
      mysqlDatabase: new KnexConnection().getConnection(),
    };
  }
}
