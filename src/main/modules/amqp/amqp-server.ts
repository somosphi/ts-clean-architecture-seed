import { connect, Channel, Connection } from 'amqplib';
import { BaseAMQP } from '@/main/modules/amqp/base-amqp';
import { Module } from '@/main/modules/modules';
import { RabbitMQConfig } from '@/main/modules/amqp/amqp.config';
import { FindUserByIdConsumer } from '@/presentation/amqp/consumers/findUserById/find-user-by-id';
import { logger } from '@/logger';
import { LogUserInfoProducer } from '@/infra/amqp/producers/logUserInfo/log-user-info';
import { AppContainer } from '@/main/container/app-container';

export class AMQPServer extends BaseAMQP implements Module {
  protected channel: Channel;

  protected connection: Connection;

  constructor(
    protected readonly appContainer: AppContainer,
    protected readonly config: RabbitMQConfig
  ) {
    super(appContainer);
  }

  loadConsumers(): Function[] {
    return [FindUserByIdConsumer];
  }

  loadProducers(): Function[] {
    return [LogUserInfoProducer];
  }

  async start(): Promise<void> {
    try {
      this.connection = await connect(this.config);

      this.channel = await this.connection.createChannel();

      logger.info(`RabbitMQ: AMQP server started`);
      const container = this.appContainer.getContainer();
      container.register('vHost', { useValue: this.channel });
      logger.info(
        `RabbitMQ connection established on vhost - ${this.config.vhost}`
      );

      this.loadProducers().forEach((producer: Function) => {
        container.register(producer.name, producer as any);
      });

      this.startConsumers();

      this.appContainer.loadContainer();
    } catch (err) {
      logger.error(
        `Error connecting RabbitMQ to virtual host ${this.config.vhost} : ${err.message}`
      );
      this.reconnect();
    }
  }
}
