import { IsInt, IsNotEmpty, IsUrl, IsNumber } from 'class-validator';

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
  redisPort: number;

  @IsNotEmpty()
  redisHost: string;

  constructor(props: any) {
    Object.assign(this, props);
  }
}
