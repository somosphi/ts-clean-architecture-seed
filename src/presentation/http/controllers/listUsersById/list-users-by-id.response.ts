import { UserSources } from '@/core/enum';

export type ListUsersByIdResponse = {
  id: string;
  name: string;
  username: string;
  emailAddress: string;
  source: UserSources;
  createdAt: string;
  updatedAt: string;
};
