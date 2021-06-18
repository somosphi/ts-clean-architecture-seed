/* eslint-disable no-console */
import { InjectionToken } from 'tsyringe';
import { table } from 'table';
import Command from '@/infra/cron-jobs/ports/command';
import { BaseCli } from '@/main/modules/cli/base-cli';
import { removeAllWhiteSpacesAndConvertToLowerCase } from '@/shared/helper/string-manipulation';

export abstract class BaseCronJobCli extends BaseCli {
  jobs: Command[];

  protected abstract loadJobs(): Function[];

  resolveJobs(): void {
    this.jobs = this.loadJobs().map(job =>
      this.container.resolve<Command>(job as InjectionToken)
    );
  }

  setupOptions(): void {
    this.program.option('-lj, --list-jobs', 'List jobs');
    this.program.option('-rj, --run-job <job-name>', 'Run job');
  }

  processCommand(): void {
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

  listJobs(): void {
    const data = [['Index', 'Schedule', 'Name']];

    this.jobs.forEach((job, index) => {
      data.push([`${index}`, job.schedule, job.name]);
    });

    console.info(`\n${table(data)}`);
    process.exit(0);
  }

  runJob(jobName: string): void {
    const jobNameFormatted = removeAllWhiteSpacesAndConvertToLowerCase(jobName);

    const job = this.jobs.find(job => {
      return (
        removeAllWhiteSpacesAndConvertToLowerCase(job.name) === jobNameFormatted
      );
    });

    if (!job) {
      console.warn(`'${jobName}' not found`);
      process.exit(1);
    }

    job.run();
  }
}
