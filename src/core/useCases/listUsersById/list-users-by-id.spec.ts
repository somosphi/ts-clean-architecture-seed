import 'reflect-metadata';
import sinon from 'sinon';
import { expect, assert } from 'chai';
import { UserSources } from '@/core/enum';
import { User } from '@/core/entities/user';
import { UserNotFoundError } from '@/core/errors';
import { ListUsersByIdUseCase } from './list-users-by-id';

describe('ListUsersByIdUseCase', () => {
  describe('#listById', () => {
    it('should return User', async () => {
      const fake_response: User = {
        id: 'string',
        name: 'string',
        username: 'string',
        email_address: 'string',
        source: UserSources.JsonPlaceholder,
        created_at: new Date(),
        updated_at: new Date(),
      };

      const id = '12';

      const user_repository_fake = {
        getById: sinon.fake.resolves(fake_response),
      };

      const container = {
        user_repository: user_repository_fake,
      };
      const list_users_by_id_use_case = new ListUsersByIdUseCase(
        // @ts-ignore
        ...Object.values(container)
      );

      const result = await list_users_by_id_use_case.listById(id);

      expect(result).to.be.eql(fake_response);
      assert(container.user_repository.getById.calledOnceWith(id));
    });

    it('should return UserNotFoundError', async () => {
      const fake_response = null;

      const id = '12';

      const user_repository_fake = {
        getById: sinon.fake.resolves(fake_response),
      };

      const container = {
        user_repository: user_repository_fake,
      };

      const list_users_by_id_use_case = new ListUsersByIdUseCase(
        // @ts-ignore
        ...Object.values(container)
      );

      let err = null;

      try {
        await list_users_by_id_use_case.listById(id);
      } catch (error) {
        err = error;
      }

      expect(err).to.be.eql(err);
      expect(err).to.be.instanceOf(UserNotFoundError);
    });
  });
});
