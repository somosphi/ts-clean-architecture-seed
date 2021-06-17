import { ListUsersJob } from '@/infra/cron-jobs/listUsers/list-users';
import { FetchUsersJob } from '@/infra/cron-jobs/fetchUsers/fetch-users';
import { BaseCronJobCli } from '@/main/modules/cli/base-cron-job-cli';
import { Module } from '@/main/modules/modules';

export class CronJobCli extends BaseCronJobCli implements Module {
  protected loadJobs(): Function[] {
    return [ListUsersJob, FetchUsersJob];
  }

  start(): void {
    this.resolveJobs();
    this.setupOptions();
    this.processCommand();
  }
}
