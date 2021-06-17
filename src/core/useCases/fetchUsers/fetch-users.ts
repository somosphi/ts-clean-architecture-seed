import { Transaction } from 'knex';
import { injectable, inject } from 'tsyringe';
import { IJsonPlaceHolderIntegration } from '@/core/ports/jsonplaceholder.integration';
import { IUserRepository } from '@/core/ports/user.repository';
import { UserSources } from '@/core/enum';
import { IFetchUsersUseCase } from './fetch-users.interface';

@injectable()
export class FetchUsersUseCase implements IFetchUsersUseCase {
  constructor(
    @inject('JsonPlaceHolderIntegration')
    private json_placeholder_integration: IJsonPlaceHolderIntegration,
    @inject('UserRepository') private user_repository: IUserRepository
  ) {}

  async fetchUsers(): Promise<string[]> {
    const json_placeholder_users = await this.json_placeholder_integration.getUsers();

    const json_placeholder_emails = json_placeholder_users.map(
      json_placeholder_user => json_placeholder_user.email_address
    );
    const fetched_ids: string[] = [];

    await this.user_repository.transaction(async (trx: Transaction) => {
      const source_database_users = await this.user_repository.getByEmailsWithSource(
        json_placeholder_emails,
        UserSources.JsonPlaceholder,
        trx
      );

      await Promise.all(
        json_placeholder_users.map(async json_placeholder_user => {
          const json_placeholder_email = json_placeholder_user.email_address.toLowerCase();

          const source_database_user = source_database_users.find(
            source_database_user =>
              source_database_user.email_address === json_placeholder_email
          );

          if (!source_database_user) {
            const create_data = {
              name: json_placeholder_user.name,
              username: json_placeholder_user.username,
              email_address: json_placeholder_email,
              source: UserSources.JsonPlaceholder,
            };
            fetched_ids.push(
              await this.user_repository.create(create_data, trx)
            );
          }
        })
      );
    });

    return fetched_ids;
  }
}
