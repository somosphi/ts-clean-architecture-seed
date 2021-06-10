import { ConsumeMessage, Channel } from 'amqplib';

export abstract class Consumer {
  abstract messageHandler(message: any): void;

  abstract onConsumeError(
    err: any,
    channel: Channel,
    message: ConsumeMessage | null
  ): void;

  queue: string;

  schema: any;
}
