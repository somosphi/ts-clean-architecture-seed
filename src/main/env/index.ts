import * as dotenv from 'dotenv';
import { EnvValidator } from './validator';

dotenv.config();

const props = {
  httpPort:
    (process.env.HTTP_PORT && parseInt(process.env.HTTP_PORT, 10)) || 3000,
  httpBodyLimit: process.env.HTTP_BODY_LIMIT || '10kb',
  jsonPlaceholderUrl:
    process.env.JSON_PLACEHOLDER_URL || 'https://jsonplaceholder.typicode.com',
};

export const env = new EnvValidator(props);
