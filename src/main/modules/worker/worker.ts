import { logger } from '@/logger';
import { Module } from '@/main/modules/modules';
import { BaseWorker } from '@/main/modules/worker/base-worker';
import { ListUsersJob } from '@/infra/cron-jobs/listUsers/list-users';
import { FetchUsersJob } from '@/infra/cron-jobs/fetchUsers/fetch-users';

export class Worker extends BaseWorker implements Module {
  protected loadJobs(): Function[] {
    return [ListUsersJob, FetchUsersJob];
  }

  start(): void {
    this.resolveJobs();

    logger.info(`Worker started with ${this.jobs.length} job(s)`);

    this.jobs.forEach(job => {
      if (!job.running) job.start();
    });
  }
}
