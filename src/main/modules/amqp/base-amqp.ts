import { Connection, Channel, ConsumeMessage } from 'amqplib';
import { DependencyContainer, InjectionToken } from 'tsyringe';
import { RabbitMQConfig } from '@/main/modules/amqp/amqp.config';
import { logger } from '@/logger';
import { Consumer } from '@/presentation/amqp/consumers/consumer';
import { validation } from '@/presentation/amqp/middlewares/validation';
import { convertToJson } from '@/shared/helper/buffer-converter';

export abstract class BaseAMQP {
  protected abstract connection: Connection;
  protected abstract channel: Channel;
  protected abstract config: RabbitMQConfig;

  abstract start(): void;
  abstract loadConsumers(): Function[];

  constructor(protected readonly container: DependencyContainer) {}

  protected startConsumers(): void {
    this.loadConsumers().forEach((consumer: Function) => {
      const instance = this.container.resolve<Consumer>(
        consumer as InjectionToken
      );

      this.channel.consume(
        instance.queue,
        async (message: ConsumeMessage | null) => {
          try {
            if (message) {
              const messageContent = validation(instance.schema)(
                convertToJson(message.content)
              );

              await instance.messageHandler(messageContent);
            }
          } catch (error) {
            instance.onConsumeError(error, this.channel, message);
          } finally {
            if (message) this.channel.ack(message);
          }
        }
      );

      logger.info(`RabbitMQ: 'Started queue '${instance.queue}' to consume`);
    });
  }

  protected reconnect(): void {
    logger.warn(
      `Trying to connect to rabbitmq on virtual host ${this.config.vhost} in 5 seconds`
    );
    setTimeout(() => {
      this.start();
    }, 5000);
  }
}
