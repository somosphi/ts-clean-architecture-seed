import 'reflect-metadata';
import container from './container';
import { HttpServer } from './modules/http-server';
import { Module } from './modules/modules';
import { DependencyContainer } from 'tsyringe';
import { Worker } from './modules/worker/worker';

export class Application {
  protected httpServer?: HttpServer;

  protected loadModules(container: DependencyContainer): Module[] {
    return [new HttpServer(container), new Worker(container)];
  }

  async start() {
    for (const module of this.loadModules(container)) {
      module.start();
    }
  }
}
