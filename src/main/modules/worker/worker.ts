import { logger } from '../../../logger';
import { Module } from '../modules';
import { BaseWorker } from './base-worker';

export class Worker extends BaseWorker implements Module {
  start(): void {
    this.loadJobs();

    logger.info(`Worker started with ${this.jobs.length} job(s)`);

    this.jobs.forEach(job => {
      if (!job.running) job.start();
    });
  }

  stop(): void {
    this.jobs.forEach(job => {
      if (job.running) job.stop();
    });
  }
}
