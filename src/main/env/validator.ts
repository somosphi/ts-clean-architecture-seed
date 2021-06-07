import { IsInt, IsNotEmpty, IsUrl, IsNumber, IsEnum } from 'class-validator';

export class EnvValidator {
  @IsInt()
  @IsNotEmpty()
  httpPort: number;

  @IsNotEmpty()
  httpBodyLimit: string;

  @IsNotEmpty()
  @IsUrl()
  jsonPlaceholderUrl: string;

  @IsNotEmpty()
  rabbitMQEnabled: string;

  @IsEnum(['amqp'])
  rabbitMQProtocol: string;

  @IsNotEmpty()
  rabbitMQHost: string;

  @IsInt()
  rabbitMQPort: number;

  @IsNotEmpty()
  rabbitMQUsername: string;

  @IsNotEmpty()
  rabbitMQPassword: string;

  @IsNotEmpty()
  rabbitMQVHost: string;
  redisPort: number;

  @IsNotEmpty()
  redisHost: string;

  constructor(props: any) {
    Object.assign(this, props);
  }
}
