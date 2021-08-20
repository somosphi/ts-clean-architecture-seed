import { inject, singleton } from 'tsyringe';
import { logger } from '@/logger';
import { IFetchUsersUseCase } from '@/core/useCases/fetchUsers/fetch-users.interface';
import Command from '@/infra/cron-jobs/ports/command';

@singleton()
export class FetchUsersJob implements Command {
  readonly name: string = 'Fetch Users Job';

  readonly schedule: string = '0 0 */1 * *';

  constructor(
    @inject('FetchUsersUseCase') private fetchUsersUseCase: IFetchUsersUseCase
  ) {}

  async run(): Promise<void> {
    const fetchedUsers = await this.fetchUsersUseCase.fetchUsers();
    logger.debug('Fetched users from json placeholder api', {
      usersCount: fetchedUsers.length,
    });
  }
}
