import { DependencyContainer, InjectionToken } from 'tsyringe';
import { WorkerCronJob } from '../../../infra/jobs/job';
import { ListTodosJob } from '../../../infra/jobs/list-todos';

export abstract class BaseWorker {
  protected jobs: WorkerCronJob[];
  constructor(private container: DependencyContainer) {}

  getJobs(): Function[] {
    return [ListTodosJob];
  }

  loadJobs() {
    this.jobs = this.getJobs().map(job =>
      this.container.resolve<WorkerCronJob>(job as InjectionToken)
    );
  }
}
