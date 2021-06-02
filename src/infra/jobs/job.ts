import { CronJob } from 'cron';
import { logger } from '../../logger';

export abstract class WorkerCronJob extends CronJob {
  protected abstract runTask(): Promise<void>;

  name: string;
  running: boolean;

  constructor(cronTime: string, timezone = 'Etc/UTC') {
    super(cronTime, () => this.execute(), null, false, timezone);
    this.name = 'Worker Cron Job';
    this.running = false;
  }

  protected async errorHandler(err: Error): Promise<void> {
    logger.error(err);
  }

  protected async execute(): Promise<void> {
    try {
      logger.info(`${this.name} has started`);
      await this.runTask();
    } catch (err) {
      try {
        await this.errorHandler(err);
      } catch (error) {
        logger.error(error);
      }
    } finally {
      logger.info(`${this.name} has finished`);
    }
  }
}
