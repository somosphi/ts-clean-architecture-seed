import { inject } from 'tsyringe';
import { ConsumeMessage } from 'amqplib';
import { Consumer } from '@/presentation/amqp/consumers/consumer';
import { IListUsersByIdUseCase } from '@/core/useCases/listUsersById/list-users-by-id.interface';
import { FindUserMessage } from '@/presentation/amqp/consumers/findUserById/find-user-by-id.dto';
import { validation } from '@/presentation/amqp/middlewares/validation';
import { findUserSchema } from '@/presentation/amqp/consumers/findUserById/find-user-by-id.schema';
import { User } from '@/core/entities/user';
import { logger } from '@/logger';
import { convertToJson } from '@/shared/helper/buffer-converter';

export class FindUserByIdConsumer extends Consumer {
  constructor(
    @inject('ListUsersByIdUseCase')
    private listUsersByIdUseCase: IListUsersByIdUseCase
  ) {
    super('user.find');
  }

  messageHandler(message: ConsumeMessage | null): void {
    if (message) {
      const messageContent: FindUserMessage = validation(findUserSchema)<
        FindUserMessage
      >(convertToJson(message.content));
      this.findUserById(messageContent);
    }
  }

  protected async findUserById(findUserMessage: FindUserMessage) {
    const user: User = await this.listUsersByIdUseCase.listById(
      findUserMessage.id
    );
    logger.info(JSON.stringify(user));
  }
}
