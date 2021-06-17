import * as dotenv from 'dotenv';
import { EnvValidator } from './validator';

dotenv.config();

const props = {
  http_port: parseInt(process.env.HTTP_PORT || '3000', 10),
  http_body_limit: process.env.HTTP_BODY_LIMIT || '10kb',
  json_placeholder_url:
    process.env.JSON_PLACEHOLDER_URL || 'https://jsonplaceholder.typicode.com',
  rabbit_mq_enabled: process.env.RABBITMQ_ENABLED || 'false',
  rabbit_mq_protocol: process.env.RABBITMQ_PROTOCOL || 'amqp',
  rabbit_mq_host: process.env.RABBITMQ_HOST || 'localhost',
  rabbit_mq_port: parseInt(process.env.RABBITMQ_PORT || '5672', 10),
  rabbit_mq_username: process.env.RABBITMQ_USERNAME || 'admin',
  rabbit_mq_password: process.env.RABBITMQ_PASSWORD || 'admin',
  rabbit_mq_vhost: process.env.RABBITMQ_VHOST || '/',
  redis_port: parseInt(process.env.REDIS_PORT || '6379', 10),
  redis_host: process.env.REDIS_HOST || '',
};

export const env = new EnvValidator(props);
