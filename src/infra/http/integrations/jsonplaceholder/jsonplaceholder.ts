import { inject, injectable } from 'tsyringe';
import { User } from '@/core/entities/user';
import { Http } from '@/infra/http/ports';
import { UserSources } from '@/core/enum';
import { JsonPlaceHolderResponse } from '@/infra/http/integrations/jsonplaceholder/jsonplaceholder.response';
import { IJsonPlaceHolderIntegration } from '@/core/ports/jsonplaceholder.integration';
import { env } from '@/main/env';

@injectable()
export class JsonPlaceHolderIntegration implements IJsonPlaceHolderIntegration {
  constructor(@inject('HttpService') private readonly http: Http) {
    http.createInstance({
      baseURL: env.json_placeholder_url,
    });
  }

  async getUsers(): Promise<User[]> {
    const result = await this.http.get<JsonPlaceHolderResponse[]>('/users');
    return result.data.map(
      item =>
        new User({
          email_address: item.email,
          name: item.name,
          source: UserSources.JsonPlaceholder,
          username: item.username,
        })
    );
  }
}
