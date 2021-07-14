import 'reflect-metadata';
import { container } from 'tsyringe';
import { AppContainer } from '@/main/container/app-container';
import { CronJobCli } from '@/main/modules/cli/cron-job-cli';

const appContainer = new AppContainer(container);
appContainer.loadContainer();

const cronJobCli = new CronJobCli(appContainer.getContainer());

setImmediate(() => {
  cronJobCli.start();
});
