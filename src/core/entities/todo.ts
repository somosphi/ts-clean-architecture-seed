import { Status } from '../enum';

export class TodoEntity {
  public readonly id: string;
  public title: string;
  public description: string;
  public status: Status;

  constructor(props: TodoEntity) {
    Object.assign(this, props);
  }
}
