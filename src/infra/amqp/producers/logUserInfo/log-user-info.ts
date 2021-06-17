import { Options, Channel } from 'amqplib';
import { injectable, inject } from 'tsyringe';
import { Producer } from '@/infra/amqp/producer';
import { logger } from '@/logger';
import { UserMessage } from '@/infra/amqp/producers/logUserInfo/log-user-info.dto';

@injectable()
export class LogUserInfoProducer extends Producer {
  protected readonly exchange: string = 'user.dx';

  protected readonly routing_key: string = 'user.create';

  constructor(@inject('vhost') protected readonly channel: Channel) {
    super();
  }

  send(message: UserMessage): void {
    const options_config: Options.Publish = {
      priority: 0,
      deliveryMode: 2,
      contentEncoding: 'UTF-8',
      contentType: 'application/json',
    };

    try {
      this.publish(this.exchange, this.routing_key, message, options_config);
      logger.info(
        `Sending message to exchange - ${this.exchange} and routingKey - ${this.routing_key}`
      );
    } catch (err) {
      logger.error(`Error sending message to exchange ${this.exchange}
       and routingKey - ${this.routing_key} -> reason: ${err.message}`);
      throw err;
    }
  }
}
