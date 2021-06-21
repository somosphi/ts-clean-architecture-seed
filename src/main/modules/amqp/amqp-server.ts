import { connect, Channel, Connection } from 'amqplib';
import { DependencyContainer } from 'tsyringe';
import { BaseAMQP } from '@/main/modules/amqp/base-amqp';
import { Module } from '@/main/modules/modules';
import { RabbitMQConfig } from '@/main/modules/amqp/amqp.config';
import { FindUserByIdConsumer } from '@/presentation/amqp/consumers/findUserById/find-user-by-id';
import { logger } from '@/logger';

export class AMQPServer extends BaseAMQP implements Module {
  protected channel: Channel;

  protected connection: Connection;

  constructor(
    protected readonly container: DependencyContainer,
    protected readonly config: RabbitMQConfig
  ) {
    super(container);
  }

  loadConsumers(): Function[] {
    return [FindUserByIdConsumer];
  }

  async start(): Promise<void> {
    try {
      this.connection = await connect(this.config);
      this.channel = await this.connection.createChannel();

      logger.debug(`RabbitMQ: AMQP server started`);

      this.container.register('vHost', { useValue: this.channel });
      logger.info(
        `RabbitMQ connection established on vhost - ${this.config.vhost}`
      );

      this.startConsumers();
    } catch (err) {
      logger.error(
        `Error connecting RabbitMQ to virtual host ${this.config.vhost} : ${err.message}`
      );
      this.reconnect();
    }
  }
}
