import { Options, Channel } from 'amqplib';
import { injectable, inject } from 'tsyringe';
import { Producer } from '@/infra/amqp/producer';
import { logger } from '@/logger';
import { UserMessage } from './log-user-info.dto';

@injectable()
export class LogUserInfoProducer extends Producer {
  protected readonly exchange: string = 'user.dx';

  protected readonly routingKey: string = 'user.create';

  constructor(@inject('vHost') protected readonly channel: Channel) {
    super();
  }

  send(message: UserMessage): void {
    const optionsConfig: Options.Publish = {
      priority: 0,
      deliveryMode: 2,
      contentEncoding: 'UTF-8',
      contentType: 'application/json',
    };

    try {
      this.publish(this.exchange, this.routingKey, message, optionsConfig);
      logger.debug(
        `Sending message to exchange - ${this.exchange} and routingKey - ${this.routingKey}`
      );
    } catch (err) {
      logger.error(`Error sending message to exchange ${this.exchange}
       and routingKey - ${this.routingKey} -> reason: ${err.message}`);
      throw err;
    }
  }
}
