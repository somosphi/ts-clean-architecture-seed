import { DependencyContainer, InjectionToken } from 'tsyringe';
import { CronJob } from '@/infra/cron-jobs/cron-job';

export abstract class BaseWorker {
  protected jobs: CronJob[];
  protected abstract loadJobs(): Function[];

  constructor(private container: DependencyContainer) {}

  resolveJobs() {
    this.jobs = this.loadJobs().map(job =>
      this.container.resolve<CronJob>(job as InjectionToken)
    );
  }

  stop(): void {
    this.jobs.forEach(job => {
      if (job.running) job.stop();
    });
  }
}
