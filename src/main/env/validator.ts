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
  rabbit_mq_enabled: string;

  @IsEnum(['amqp'])
  rabbit_mq_protocol: string;

  @IsNotEmpty()
  rabbit_mq_host: string;

  @IsInt()
  rabbit_mq_port: number;

  @IsNotEmpty()
  rabbit_mq_username: string;

  @IsNotEmpty()
  rabbit_mq_password: string;

  @IsNotEmpty()
  rabbit_mq_vhost: string;

  redis_port: number;

  @IsNotEmpty()
  redis_host: string;

  constructor(props: any) {
    Object.assign(this, props);
  }
}
