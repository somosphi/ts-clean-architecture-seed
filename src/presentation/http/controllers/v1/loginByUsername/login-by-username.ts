import { injectable, inject } from 'tsyringe';
import { Controller } from '@/presentation/http/controllers/controller';
import { HttpRequest, HttpResponse } from '@/presentation/http/ports/http';
import {
  version,
  post,
  schema,
} from '@/presentation/http/controllers/controller.config';
import { ILoginByUsernameUseCase } from '@/core/useCases/loginByUsername/login-by-username.interface';
import { UserNotFoundError } from '@/core/exceptions';
import { NotFoundError } from '@/presentation/http/exceptions';
import { authScheama } from './login-by-username.schema';

@version('/v1')
@post('/auth')
@injectable()
export class LoginByUsernameController extends Controller {
  constructor(
    @inject('LoginByUsernameUseCase')
    private readonly loginByUsernameUseCase: ILoginByUsernameUseCase
  ) {
    super();
  }

  @schema(authScheama)
  async handle(req: HttpRequest): Promise<HttpResponse> {
    const { username } = req.body;
    const token = await this.loginByUsernameUseCase.login(username);

    return {
      headers: {
        'User-Info': token,
      },
    };
  }

  exception(error: Error): Error {
    if (error instanceof UserNotFoundError) {
      const { code, message } = error;
      return new NotFoundError(code, message);
    }

    return error;
  }
}
