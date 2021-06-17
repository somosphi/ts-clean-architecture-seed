import * as dotenv from 'dotenv';
import { EnvValidator } from './validator';

dotenv.config();

const props = {
  http_port: parseInt(process.env.HTTP_PORT || '3000', 10),
  http_body_limit: process.env.HTTP_BODY_LIMIT || '10kb',
  json_placeholder_url:
    process.env.JSON_PLACEHOLDER_URL || 'https://jsonplaceholder.typicode.com',
  rabbitMQ_enabled: process.env.RABBITMQ_ENABLED || 'false',
  rabbitMQ_protocol: process.env.RABBITMQ_PROTOCOL || 'amqp',
  rabbitMQ_host: process.env.RABBITMQ_HOST || 'localhost',
  rabbitMQ_port: parseInt(process.env.RABBITMQ_PORT || '5672', 10),
  rabbitMQ_username: process.env.RABBITMQ_USERNAME || 'admin',
  rabbitMQ_password: process.env.RABBITMQ_PASSWORD || 'admin',
  rabbitMQ_vhost: process.env.RABBITMQ_VHOST || '/',
  redis_port: parseInt(process.env.REDIS_PORT || '6379', 10),
  redis_host: process.env.REDIS_HOST || '',
};

export const env = new EnvValidator(props);
