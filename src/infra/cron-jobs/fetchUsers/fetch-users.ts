import { inject, singleton } from 'tsyringe';
import { logger } from '@/logger';
import { CronJob } from '@/infra/cron-jobs/cron-job';
import { IFetchUsersUseCase } from '@/core/useCases/fetchUsers/fetch-users.interface';

@singleton()
export class FetchUsersJob extends CronJob {
  constructor(
    @inject('FetchUsersUseCase') private fetchUsersUseCase: IFetchUsersUseCase
  ) {
    super('*/60 * * * * *');
    this.name = 'Fetch Users Job';
  }

  protected async runTask(): Promise<void> {
    const fetchedUsers = await this.fetchUsersUseCase.fetchUsers();
    logger.info('Fetched users from json placeholder api', {
      usersCount: fetchedUsers.length,
    });
  }
}
