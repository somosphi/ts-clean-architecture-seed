import { inject, singleton } from 'tsyringe';
import { logger } from '@/logger';
import { IListUsersUseCase } from '@/core/useCases/listUsers/list-users.interface';
import Command from '@/infra/cron-jobs/ports/command';

@singleton()
export class ListUsersJob implements Command {
  readonly name: string = 'List Users Job';

  readonly schedule: string = '0 0 */1 * *';

  constructor(
    @inject('ListUsersUseCase') private listUsersUseCase: IListUsersUseCase
  ) {}

  async run(): Promise<void> {
    const users = await this.listUsersUseCase.list();
    for (const user of users) {
      logger.debug(`(${user.id}) ${user.name}`);
    }
  }
}
