import { Connection, Channel, ConsumeMessage } from 'amqplib';
import { InjectionToken } from 'tsyringe';
import { RabbitMQConfig } from '@/main/modules/amqp/amqp.config';
import { logger } from '@/logger';
import { convertToJson } from '@/shared/helper/buffer-converter';
import { EventEmmiter } from '@/main/event';
import { ContainerEvent } from '@/main/enum';
import { AppContainer } from '@/main/container/app-container';
import { validation } from '@/presentation/amqp/middlewares/validation';
import { Consumer } from '@/presentation/amqp/consumers/consumer';

export abstract class BaseAMQP {
  protected abstract connection: Connection;

  protected abstract channel: Channel;

  protected abstract config: RabbitMQConfig;

  abstract start(): void;

  abstract loadConsumers(): Function[];

  constructor(protected readonly app_container: AppContainer) {}

  protected startConsumers(): void {
    const event = EventEmmiter.getInstance();

    this.loadConsumers().forEach((consumer: Function) => {
      const container = this.app_container.getContainer();

      event.on(ContainerEvent.Loaded, () => {
        const instance = container.resolve<Consumer>(
          consumer as InjectionToken
        );

        this.channel.consume(
          instance.queue,
          async (message: ConsumeMessage | null) => {
            try {
              if (message) {
                const message_content = validation(instance.schema)(
                  convertToJson(message.content)
                );

                instance.messageHandler(message_content);
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
