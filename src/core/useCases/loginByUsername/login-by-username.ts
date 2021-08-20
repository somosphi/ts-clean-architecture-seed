import { injectable, inject } from 'tsyringe';
import jwt from 'jsonwebtoken';
import { ILoginByUsernameUseCase } from '@/core/useCases/loginByUsername/login-by-username.interface';
import { IUserRepository } from '@/core/ports/user.repository';
import { UserNotFoundError } from '@/core/exceptions';
import { env } from '@/main/env';

@injectable()
export class LoginByUsernameUseCase implements ILoginByUsernameUseCase {
  constructor(
    @inject('UserRepository') private readonly userRepository: IUserRepository
  ) {}

  async login(username: string): Promise<string> {
    const user = await this.userRepository.getByUsername(username);

    if (!user) {
      throw new UserNotFoundError();
    }

    const { name, emailAddress } = user;
    return jwt.sign({ name, username, emailAddress }, env.jwtSecret);
  }
}
