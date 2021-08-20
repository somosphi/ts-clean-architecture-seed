import { singleton } from 'tsyringe';
import jwt from 'jsonwebtoken';
import { Middleware } from '@/presentation/http/middleware/middleware.config';
import { HttpRequest } from '@/presentation/http/ports/http';
import { AuthenticationError } from '@/presentation/http/exceptions';
import { env } from '@/main/env';
import { User } from '@/core/entities/user';

@singleton()
export class AuthMiddleware implements Middleware {
  async handle(req: HttpRequest) {
    const userInfo = req.headers['user-info'] as string;
    if (!userInfo || !userInfo.startsWith('Bearer ')) {
      throw new AuthenticationError();
    }

    const replacedUserInfo = userInfo.replace('Bearer ', '');

    try {
      const decodedToken = await jwt.verify(replacedUserInfo, env.jwtSecret);
      const { name, username, emailAddress } = decodedToken as Partial<User>;

      req.user = {
        name: name!,
        username: username!,
        emailAddress: emailAddress!,
      };
    } catch (err) {
      throw new AuthenticationError();
    }
  }
}
