"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const user_1 = require("@/infra/repositories/user");
const http_service_1 = require("@/infra/http/http.service");
const integrations_1 = require("@/infra/http/integrations");
const knex_1 = require("@/infra/db/knex");
const log_user_info_1 = require("@/infra/amqp/producers/logUserInfo/log-user-info");
const useCases_1 = require("@/core/useCases");
const base_1 = require("./config/base");
class AppContainer extends base_1.BaseContainer {
    loadProviders() {
        return [
            http_service_1.HttpService,
            integrations_1.JsonPlaceHolderIntegration,
            useCases_1.ListUsersUseCase,
            useCases_1.ListUsersByIdUseCase,
            user_1.UserRepository,
            log_user_info_1.LogUserInfoProducer,
            useCases_1.FetchUsersUseCase,
        ];
    }
    loadConfigs() {
        return {
            mysqlDatabase: new knex_1.KnexConnection().getConnection(),
        };
    }
}
exports.default = new AppContainer(tsyringe_1.container).getContainer();
