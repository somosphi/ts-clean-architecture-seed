import { DependencyContainer, InjectionToken } from 'tsyringe';
import Command from '@/infra/cron-jobs/ports/command';

export abstract class BaseWorker {
  jobs: Command[];

  protected abstract loadJobs(): Function[];

  constructor(private container: DependencyContainer) {}

  resolveJobs() {
    this.jobs = this.loadJobs().map(job =>
      this.container.resolve<Command>(job as InjectionToken)
    );
  }
}
