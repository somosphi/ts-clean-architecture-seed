import 'module-alias/register';
import { Application } from '@/main/app';

setImmediate(() => {
  const app = new Application();
  app.start();
});
