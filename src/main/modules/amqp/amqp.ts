import { Connection, Channel } from 'amqplib';
import { RabbitMQConfig } from '@/main/modules/amqp/amqp.config';
import { logger } from '@/logger';

export abstract class AMQP {
  protected abstract connection: Connection;
  protected abstract channel: Channel;
  protected abstract config: RabbitMQConfig;

  abstract start(): void;
  abstract loadConsumers(): Function[];

  protected reconnect(): void {
    logger.warn(
      `Trying to connect to rabbitmq on virtual host ${this.config.vhost} in 5 seconds`
    );
    setTimeout(() => {
      this.start();
    }, 5000);
  }
}
