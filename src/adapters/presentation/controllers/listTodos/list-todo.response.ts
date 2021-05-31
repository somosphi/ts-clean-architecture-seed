import { Status } from '../../../../core/enum';

export type ListTodoResponse = {
  id: string;
  title: string;
  description: string;
  status: Status;
};
