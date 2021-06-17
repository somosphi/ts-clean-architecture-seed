import { inject, singleton } from 'tsyringe';
import { IListUsersUseCase } from '@/core/useCases/listUsers/list-users.interface';
import { logger } from '@/logger';
import { CronJob } from '@/infra/cron-jobs/cron-job';

@singleton()
export class ListUsersJob extends CronJob {
  constructor(
    @inject('ListUsersUseCase') private list_users_use_case: IListUsersUseCase
  ) {
    super('*/5 * * * *');
    this.name = 'List Users Job';
  }

  protected async runTask(): Promise<void> {
    const users = await this.list_users_use_case.list();
    for (const user of users) {
      logger.info(`(${user.id}) ${user.name}`);
    }
  }
}
