import { Channel, Options, connect } from 'amqplib';
import { converter } from '@/shared/helper/buffer-converter';

export abstract class Producer {
  protected abstract channel: Channel;

  publish(
    exchange: string,
    routing_key: string,
    message: object,
    additional_params?: Options.Publish
  ): void {
    try {
      this.channel.publish(
        exchange || '',
        routing_key,
        converter(message),
        additional_params
      );
    } catch (err) {
      throw Error(
        `Error Posting Message to RabbitMQ Server - cause ${err.message}`
      );
    }
  }
}
