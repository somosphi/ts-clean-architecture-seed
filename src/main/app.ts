import 'reflect-metadata';
import { DependencyContainer } from 'tsyringe';
import { Worker } from './modules/worker/worker';
import container from '@/main/container';
import { HttpServer } from '@/main/modules/http-server';
import { Module } from '@/main/modules/modules';

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
