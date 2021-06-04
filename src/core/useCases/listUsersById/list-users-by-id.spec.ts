import 'reflect-metadata';
import sinon from 'sinon';
import { expect, assert } from 'chai';
import { ListUsersByIdUseCase } from './list-users-by-id';
import { UserSources } from '../../../core/enum';
import { User } from '../../../core/entities/user';
import { UserNotFoundError } from '../../../core/errors';

describe('ListUsersByIdUseCase', () => {
  describe('#listById', () => {
    it('should return User', async () => {
      const fakeResponse: User = {
        id: 'string',
        name: 'string',
        username: 'string',
        emailAddress: 'string',
        source: UserSources.JsonPlaceholder,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const id = '12';

      const userRepositoryFake = {
        getById: sinon.fake.resolves(fakeResponse),
      };

      const container = {
        userRepository: userRepositoryFake,
      };
      const listUsersByIdUseCase = new ListUsersByIdUseCase(
        // @ts-ignore
        ...Object.values(container)
      );

      const result = await listUsersByIdUseCase.listById(id);

      expect(result).to.be.eql(fakeResponse);
      assert(container.userRepository.getById.calledOnceWith(id));
    });

    it('should return UserNotFoundError', async () => {
      const fakeResponse = null;

      const id = '12';

      const userRepositoryFake = {
        getById: sinon.fake.resolves(fakeResponse),
      };

      const container = {
        userRepository: userRepositoryFake,
      };
      const listUsersByIdUseCase = new ListUsersByIdUseCase(
        // @ts-ignore
        ...Object.values(container)
      );

      let err = null;

      try {
        await listUsersByIdUseCase.listById(id);
      } catch (error) {
        err = error;
      }

      expect(err).to.be.eql(err);
      expect(err).to.be.instanceOf(UserNotFoundError);
    });
  });
});