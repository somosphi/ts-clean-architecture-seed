import { InjectionToken } from 'tsyringe';
import { AppContainer } from '@/main/container/app-container';

export abstract class BaseWorker {
  protected jobs: CronJob[];

  protected abstract loadJobs(): Function[];

  constructor(private appContainer: AppContainer) {}

  resolveJobs() {
    this.jobs = this.loadJobs().map(job =>
      this.appContainer.getContainer().resolve<CronJob>(job as InjectionToken)
    );
  }

  stop(): void {
    this.jobs.forEach(job => {
      if (job.running) job.stop();
    });
  }
}
