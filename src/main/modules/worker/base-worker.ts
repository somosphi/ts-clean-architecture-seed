import { DependencyContainer, InjectionToken } from 'tsyringe';
import { CronJob } from '../../../infra/cron-jobs/cron-job';
import { ListUsersJob } from '../../../infra/cron-jobs/list-users';

export abstract class BaseWorker {
  protected jobs: CronJob[];
  constructor(private container: DependencyContainer) {}

  getJobs(): Function[] {
    return [ListUsersJob];
  }

  loadJobs() {
    this.jobs = this.getJobs().map(job =>
      this.container.resolve<CronJob>(job as InjectionToken)
    );
  }
}
