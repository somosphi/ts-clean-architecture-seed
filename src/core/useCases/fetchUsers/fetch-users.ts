import { Transaction } from 'knex';
import { injectable, inject } from 'tsyringe';
import { IJsonPlaceHolderIntegration } from '@/core/ports/jsonplaceholder.integration';
import { IUserRepository } from '@/core/ports/user.repository';
import { UserSources } from '@/core/enum';
import { IFetchUsersUseCase } from '@/core/useCases/fetchUsers/fetch-users.interface';

@injectable()
export class FetchUsersUseCase implements IFetchUsersUseCase {
  constructor(
    @inject('JsonPlaceHolderIntegration')
    private jsonPlaceHolderIntegration: IJsonPlaceHolderIntegration,
    @inject('UserRepository') private userRepository: IUserRepository
  ) {}

  async fetchUsers(): Promise<string[]> {
    const jsonPlaceholderUsers = await this.jsonPlaceHolderIntegration.getUsers();

    const jsonPlaceholderEmails = jsonPlaceholderUsers.map(
      jsonPlaceholderUser => jsonPlaceholderUser.emailAddress
    );
    const fetchedIds: string[] = [];

    await this.userRepository.transaction(async (trx: Transaction) => {
      const sourceDatabaseUsers = await this.userRepository.getByEmailsWithSource(
        jsonPlaceholderEmails,
        UserSources.JsonPlaceholder,
        trx
      );

      await Promise.all(
        jsonPlaceholderUsers.map(async jsonPlaceholderUser => {
          const jsonPlaceholderEmail = jsonPlaceholderUser.emailAddress.toLowerCase();

          const sourceDatabaseUser = sourceDatabaseUsers.find(
            sourceDatabaseUser =>
              sourceDatabaseUser.emailAddress === jsonPlaceholderEmail
          );

          if (!sourceDatabaseUser) {
            const createData = {
              name: jsonPlaceholderUser.name,
              username: jsonPlaceholderUser.username,
              emailAddress: jsonPlaceholderEmail,
              source: UserSources.JsonPlaceholder,
            };
            fetchedIds.push(await this.userRepository.create(createData, trx));
          }
        })
      );
    });

    return fetchedIds;
  }
}
