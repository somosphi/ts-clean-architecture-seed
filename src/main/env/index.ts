import * as dotenv from 'dotenv';
import { EnvValidator } from './validator';

dotenv.config();

const props = {
  httpPort:
    (process.env.HTTP_PORT && parseInt(process.env.HTTP_PORT, 10)) || 3000,
  httpBodyLimit: process.env.HTTP_BODY_LIMIT || '10kb',
  jsonPlaceholderUrl:
    process.env.JSON_PLACEHOLDER_URL || 'https://jsonplaceholder.typicode.com',
  rabbitMQEnabled: process.env.RABBITMQ_ENABLED || 'false',
  rabbitMQProtocol: process.env.RABBITMQ_PROTOCOL || 'amqp',
  rabbitMQHost: process.env.RABBITMQ_HOST || 'localhost',
  rabbitMQPort: parseInt(process.env.RABBITMQ_PORT || '5672', 10),
  rabbitMQUsername: process.env.RABBITMQ_USERNAME || 'admin',
  rabbitMQPassword: process.env.RABBITMQ_PASSWORD || 'admin',
  rabbitMQVHost: process.env.RABBITMQ_VHOST || '/',
  redisPort: process.env.REDIS_PORT
    ? parseInt(process.env.REDIS_PORT, 10)
    : 6379,
  redisHost: process.env.REDIS_HOST || '',
};

export const env = new EnvValidator(props);
