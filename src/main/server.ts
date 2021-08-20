import { ValidationError } from 'class-validator';
import 'module-alias/register';
import { Application } from '@/main/app';
import { logger } from '@/logger';

const application = new Application();

setImmediate(async () => {
  try {
    await application.start();
    logger.info('Application started');
  } catch (err) {
    if (err.length && err[0] instanceof ValidationError) {
      application.throwEnvValidatorErrors(err);
    }
    throw err;
  }
});
