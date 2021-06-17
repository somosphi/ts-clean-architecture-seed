import { IsInt, IsNotEmpty, IsUrl, IsEnum } from 'class-validator';

export class EnvValidator {
  @IsInt()
  @IsNotEmpty()
  http_port: number;

  @IsNotEmpty()
  http_body_limit: string;

  @IsNotEmpty()
  @IsUrl()
  json_placeholder_url: string;

  @IsNotEmpty()
  rabbitMQ_enabled: string;

  @IsEnum(['amqp'])
  rabbitMQ_protocol: string;

  @IsNotEmpty()
  rabbitMQ_host: string;

  @IsInt()
  rabbitMQ_port: number;

  @IsNotEmpty()
  rabbitMQ_username: string;

  @IsNotEmpty()
  rabbitMQ_password: string;

  @IsNotEmpty()
  rabbitMQ_vhost: string;

  redis_port: number;

  @IsNotEmpty()
  redis_host: string;

  constructor(props: any) {
    Object.assign(this, props);
  }
}
