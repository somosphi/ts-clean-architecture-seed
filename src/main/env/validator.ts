import { IsInt, IsNotEmpty } from 'class-validator';

export class EnvValidator {
  @IsInt()
  @IsNotEmpty()
  httpPort: number;

  @IsNotEmpty()
  httpBodyLimit: string;

  constructor(props: any) {
    Object.assign(this, props);
  }
}
