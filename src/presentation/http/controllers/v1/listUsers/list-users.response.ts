import { UserSources } from '@/core/enum';

export type ListUsersResponse = {
  id: string;
  name: string;
  username: string;
  emailAddress: string;
  source: UserSources;
  createdAt: string;
  updatedAt: string;
};
