import 'reflect-metadata';
import { ValidationError, validateOrReject } from 'class-validator';
import { DependencyContainer } from 'tsyringe';
import container from '@/main/container/app-container';
import { HttpServer } from '@/main/modules/http/http-server';
import { Module } from '@/main/modules/modules';
import { AMQPServer } from '@/main/modules/amqp/amqp-server';
import { env } from '@/main/env';
import { Worker } from './modules/worker/worker';
import { CacheClient } from './modules/cache/cache-client';

export class Application {
  protected httpServer?: HttpServer;

  protected loadModules(container: DependencyContainer): Module[] {
    return [
      new HttpServer(container),
      new Worker(container),
      new AMQPServer(container, {
        protocol: env.rabbitMQ_protocol,
        host: env.rabbitMQ_host,
        port: env.rabbitMQ_port,
        username: env.rabbitMQ_username,
        password: env.rabbitMQ_password,
        vhost: env.rabbitMQ_vhost,
      }),
      new CacheClient(),
    ];
  }

  async start() {
    await validateOrReject(env);

    for (const module of this.loadModules(container)) {
      module.start();
    }
  }

  throwEnvValidatorErrors(err: ValidationError[]) {
    err.forEach((item: ValidationError) => {
      for (const key in item.constraints) {
        if (key) {
          const message = item.constraints[key];
          throw new Error(message);
        }
      }
    });
  }
}
