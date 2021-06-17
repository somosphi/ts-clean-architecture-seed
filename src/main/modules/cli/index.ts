import container from '@/main/container/app-container';
import { CronJobCli } from '@/main/modules/cli/cron-job-cli';

const cronJobCli = new CronJobCli(container);

setImmediate(() => {
  cronJobCli.start();
});
