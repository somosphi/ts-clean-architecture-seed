import { Application } from './app';

setImmediate(() => {
  const app = new Application();
  app.start();
});
