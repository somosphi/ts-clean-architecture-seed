/* eslint-disable no-console */
import { InjectionToken } from 'tsyringe';
import { table } from 'table';
import Command from '@/infra/cron-jobs/ports/command';
import { BaseCli } from '@/main/modules/cli/base-cli';

export abstract class BaseCronJobCli extends BaseCli {
  jobs: Command[];

  protected abstract loadJobs(): Function[];

  resolveJobs() {
    this.jobs = this.loadJobs().map(job =>
      this.container.resolve<Command>(job as InjectionToken)
    );
  }

  setupOptions() {
    this.program.option('-lj, --list-jobs', 'List jobs');
    this.program.option('-rj, --run-job <job-name>', 'Run job');
  }

  processCommand() {
    const options = this.getOptions();

    if (options.listJobs) {
      this.listJobs();
    } else if (options.runJob) {
      this.runJob(options.runJob);
    } else {
      console.warn(`Command not found`);
      process.exit(1);
    }
  }

  listJobs() {
    const data = [['Index', 'Schedule', 'Name']];

    this.jobs.forEach((job, index) => {
      data.push([`${index}`, job.schedule, job.name]);
    });

    console.info(`\n${table(data)}`);
    process.exit(0);
  }

  runJob(name: string) {
    const job = this.jobs.find(job => job.name === name);

    if (!job) {
      console.warn(`'${name}' not found`);
      process.exit(1);
    }

    job.run();
  }
}
