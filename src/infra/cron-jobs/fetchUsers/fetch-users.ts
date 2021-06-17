import { inject, singleton } from 'tsyringe';
import { logger } from '@/logger';
import { CronJob } from '@/infra/cron-jobs/cron-job';
import { IFetchUsersUseCase } from '@/core/useCases/fetchUsers/fetch-users.interface';

@singleton()
export class FetchUsersJob extends CronJob {
  constructor(
    @inject('FetchUsersUseCase')
    private fetch_users_use_case: IFetchUsersUseCase
  ) {
    super('*/60 * * * * *');
    this.name = 'Fetch Users Job';
  }

  protected async runTask(): Promise<void> {
    const fetched_users = await this.fetch_users_use_case.fetchUsers();
    logger.info('Fetched users from json placeholder api', {
      users_count: fetched_users.length,
    });
  }
}
