/* eslint-disable no-console */
import 'reflect-metadata';
import commander from 'commander';
import { table } from 'table';
import { Worker } from '@/main/modules/worker/worker';
import container from '@/main/container/app-container';

const worker = new Worker(container);
worker.start();

const program = new commander.Command();
const { jobs } = worker;

program
  .command('list')
  .description('List available jobs')
  .action(() => {
    const data = [['Index', 'Schedule', 'Name']];

    jobs.forEach((job, index) => {
      data.push([`${index}`, job.schedule, job.name]);
    });

    console.info(`\n${table(data)}`);
    process.exit(0);
  });

program
  .command('exec <name>')
  .description('Exececute job')
  .action(name => {
    const job = jobs.find(job => job.name === name);

    if (!job) {
      console.log(`'${name}' not found`);
      process.exit(1);
    }

    job.run();
  });

program.command('*').action(() => {
  console.warn(`Command not found`);
  process.exit(1);
});

setImmediate(() => {
  program.parse(process.argv);
});
