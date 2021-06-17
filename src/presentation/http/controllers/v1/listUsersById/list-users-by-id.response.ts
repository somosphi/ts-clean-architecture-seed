import { UserSources } from '@/core/enum';

export type ListUsersByIdResponse = {
  id: string;
  name: string;
  username: string;
  email_address: string;
  source: UserSources;
  created_at: string;
  updated_at: string;
};
