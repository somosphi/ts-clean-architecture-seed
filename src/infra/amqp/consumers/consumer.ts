import { ConsumeMessage, Channel, Message } from 'amqplib';

export abstract class Consumer {
  constructor(readonly queue: string) {}

  abstract messageHandler(message: ConsumeMessage | null): void;

  onConsume(channel: Channel) {
    return (message: Message | null): void => {
      try {
        this.messageHandler(message);
      } catch (error) {
        this.onConsumeError(error, channel, message);
      } finally {
        if (message) channel.ack(message);
      }
    };
  }

  onConsumeError(
    err: any,
    channel: Channel,
    message: ConsumeMessage | null
  ): void {}
}
