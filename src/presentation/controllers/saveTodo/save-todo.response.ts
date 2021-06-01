import { Status } from '../../../core/enum';

export type SaveTodoResponse = {
  id: string;
  title: string;
  description: string;
  status: Status;
};
