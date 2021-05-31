import { Application } from './app';
import { env } from './env';

setImmediate(() => {
  const app = new Application();
  app.start();
});
