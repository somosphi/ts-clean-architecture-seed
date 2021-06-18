import 'reflect-metadata';
import { ValidationError, validateOrReject } from 'class-validator';
import { DependencyContainer } from 'tsyringe';
import container from '@/main/container/app-container';
import { HttpServer } from '@/main/modules/http/http-server';
import { Module } from '@/main/modules/modules';
import { AMQPServer } from '@/main/modules/amqp/amqp-server';
import { env } from '@/main/env';
import { CacheClient } from './modules/cache/cache-client';

export class Application {
  protected loadModules(container: DependencyContainer): Module[] {
    return [
      new HttpServer(container),
      new AMQPServer(container, {
        protocol: env.rabbitMQProtocol,
        host: env.rabbitMQHost,
        port: env.rabbitMQPort,
        username: env.rabbitMQUsername,
        password: env.rabbitMQPassword,
        vhost: env.rabbitMQVHost,
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
