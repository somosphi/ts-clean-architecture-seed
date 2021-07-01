# Documentação

## Introdução:

O projeto baseado na arquitetura limpa (clean architecture), tem como principal objetivo o desacoplhamento de camadas onde as camadas mais internas da aplicação (core) não devem sofrer com mudanças da parte mais externas(infra), como por exemplo mudanças de frameworks, pacotes e etc.

## Iniciando a o projeto:

Para rodar o projeto primeiro precisamos fazer a instalação dos pacotes do node. Tenha em mente que como o projeto é em Typescript é necessário te-lo instalado previamente. Rode o seguinte comando para instalação dos pacotes:

```
  npm i
```

Com os pacotes instalados certifique-se de criar o arquivo `.env` contendo as variáveis de configuração (o valor inicial das variáveis pode ser encontrado no arquivo `.env.sample`).

Feito isso basta rodar o seguite comando e o servidor estará rodando:

```
  npm run dev
```

## Estrutura do projeto

- **Todas as classes que irão ser injetadas em outras camadas deverão conter a anotation `@injectable()`**
- O projeto é composto pela seguinte estrutura:

```
.
└── src/
    ├── core/
    │   ├── entities
    │   ├── ports
    │   ├── useCases
    │   ├── enum.ts
    │   └── error.ts
    ├── infra/
    │   ├── amqp/
    │   │   ├── producers
    │   │   └── producer.ts
    │   ├── cache/
    │   │   ├── ports
    │   │   └── cache.service.ts
    │   ├── cron-jobs/
    │   │   └── ports
    │   ├── db/
    │   │   ├── ports
    │   │   └── knex.ts
    │   ├── http/
    │   │   ├── integrations
    │   │   ├── ports
    │   │   └── http.service.ts
    │   └── repositories/
    │       ├── repository.config.ts
    │       └── respository.ts
    ├── main/
    │   ├── container/
    │   │   ├── config
    │   │   └── app-container.ts
    │   ├── env/
    │   │   ├── index.ts
    │   │   └── validator.ts
    │   └── modules/
    │       ├── amqp/
    │       │   ├── amqp-server.ts
    │       │   ├── amqp-config.ts
    │       │   └── base-amqp.ts
    │       ├── cache/
    │       │   └── cache-client.ts
    │       ├── cli/
    │       │   ├── base-cli.ts
    │       │   ├── base-cron-job-cli.ts
    │       │   ├── cron-job-cli.ts
    │       │   └── index.ts
    │       ├── http/
    │       │   ├── base-http.ts
    │       │   └── http-server.ts
    │       └── modules.ts
    ├── presentation/
    │   ├── amqp/
    │   │   ├── consumers/
    │   │   │   ├── consumer.config.ts
    │   │   │   └── consumer.ts
    │   │   ├── middlwares/
    │   │   │   └── validation.ts
    │   │   └── errors.ts
    │   ├── http/
    │   │   ├── controllers/
    │   │   │   ├── v1
    │   │   │   ├── controller.config.ts
    │   │   │   ├── controller.ts
    │   │   │   └── index.ts
    │   │   ├── middlwares/
    │   │   │   ├── error-handler.ts
    │   │   │   └── validator-schema.ts
    │   │   ├── ports/
    │   │   │   └── http.ts
    │   │   └── errors.ts
    │   └── i18n/
    │       ├── locales
    │       └── index.ts
    ├── shared/
    │   ├── helper
    │   └── coded-error.ts
    └── logger.ts
```

### Core Layer

É considerado o coração do projeto, carregando a identidade da aplicação e as regras de negócio.

- `Entities`: Representa a tabela da base de dados em código:

  - Uma classe com o nome da tabela e suas propriedades;

- `useCases`: Responsável por conter as regras de negócio da aplicação. Não deve depender diretamente de implementações externas e sim de abstrações que são mantidas na pasta de `ports`:

  - Todos useCases devem implementar uma interface que defina qual será o método principal da classe que será chamado em outras camadas da aplicação.
  - As abstrações de dependências externas são injetadas via injeção de dependência no construtor da classe.
  - No exemplo abaixo apontamos para uma abstração de `UserRepository`(`IUserRepository`) e informamos qual é a classe que vai substituir essa abstração em tempo de execução(`UserRepository`);

    ```typescript
    @injectable()
    export class ListUsersUseCase implements IListUsersUseCase {
      constructor(
        @inject('UserRepository') private userRepository: IUserRepository
      ) {}
      async list(): Promise<User[]> {
        return this.userRepository.all();
      }
    }
    ```

- `ports`: São arquivos de contratos que definem os métodos a serem implementados:

  - Os contratos devem conter somente o necessário para o funcionamento dos useCases.

  - A nomenclatura dos arquivos segue o seguinte padrão: `nome.camada.ts`

  `ex.:`

  - user.cache.ts
  - jsonplaceholder.integration.ts
  - user.repository.ts

    ```typescript
    export interface IJsonPlaceHolderIntegration {
      getUsers(): Promise<User[]>;
    }
    ```

---

### Infra Layer

É a camada mais externa da aplicação. Contém a lógica necessaria para o funcionamento das regras de negócio e faz a comunicação com pacotes externos (axios, knex, cron-jobs, etc).

- `amqp`: Responsável por abrigar os producers da aplicação:

  - `producers`: Código que enviará mensagem para determinada fila.
    - Todos os producers extende a classe `Producer` que disponibiliza um método para fazer o send da mensagem para uma fila.
    - Devem conter as propriedades `exchange` e `routingKey`.
    - Para o producer realizar o envio de mensagens para a fila deve injetar `channel` no construtor (cadastrado no container como `vHost`).

  `ex.:`

  ```typescript
  @injectable()
  export class LogUserInfoProducer extends Producer {
    protected readonly exchange: string = 'user.dx';

    protected readonly routing_key: string = 'user.create';

    constructor(@inject('vhost') protected readonly channel: Channel) {
      super();
    }

    send(message: UserMessage): void {
      const options_config: Options.Publish = {
        priority: 0,
        deliveryMode: 2,
        contentEncoding: 'UTF-8',
        contentType: 'application/json',
      };

      try {
        this.publish(this.exchange, this.routing_key, message, options_config);
        logger.debug(
          `Sending message to exchange - ${this.exchange} and routingKey - ${this.routing_key}`
        );
      } catch (err) {
        logger.error(`Error sending message to exchange ${this.exchange}
       and routingKey - ${this.routing_key} -> reason: ${err.message}`);
        throw err;
      }
    }
  }
  ```

- `cache`: Responsável por guardar dados temporários.

  - As classes de cache devem implementar o contrato definido na camada `core`;
  - Deve receber via injeção de dependência uma abstração de `cache` e não sua implementação;
  - A abstração de cache disponibiliza os métodos `get`, `set` e `setWithExpirationTime`;
  - No exemplo abaixo apontamos para uma abstração de `Cache` e informamos qual é a classe que vai substituir essa abstração em tempo de execução(`Cache`);

    ```typescript
    @injectable()
    export class UserCache implements IUserCache {
      constructor(@inject('Cache') protected readonly cache: Cache) {}

      async getUserEmailAddress(id: number): Promise<string | null> {
        return this.cache.get(`users:${id}:email_address`);
      }
    }
    ```

- `cron-jobs`: Diretório responsável por determinar rotina específica da aplicação:

  - A classe deve implementar a interface `Command`;
  - Devem conter as propriedades `name` e `schedule`;
  - A propriedade schedule deve ser uma `cron-expression`;
    - ex.: `'0 0 */1 * *'`;
  - Deve receber via injeção de dependência uma abstração de useCase(camada que contém as regras de negócio);

    - Alguns comandos para rodar os jobs:

    | Description | Command               | Short           |
    | ----------- | --------------------- | --------------- |
    | Help        | `--help`              | `-h`            |
    | List jobs   | `--list-jobs`         | `-lj`           |
    | Run job     | `--run-job <jobname>` | `-rj <jobname>` |

    `ex.:`

    - npm run cli --run-job "List Users Job"
    - npm run cli -rj "listusersjob"
    - npm run cli-dev -lj
    - npm run cli-dev --help

* `db`: Responsável por configurar a base de dados.

* `http`: Diretório responsável por comunicação http com api's externas;

  - `integrations`:

    - As classes de `integrations` devem implementar o contrato definido na camada `core`;
    - Devem receber via injeção de dependência uma abstração de `Http`;
    - Deve ser utilizado o método `createInstance` para configurar o serviço de http com a url base da integração;
    - No exemplo abaixo apontamos para uma abstração de `Http` e informamos qual é a classe que vai substituir essa abstração em tempo de execução(`HttpService`);

    ```typescript
    export class JsonPlaceHolderIntegration
      implements IJsonPlaceHolderIntegration {
      constructor(@inject('HttpService') private readonly http: Http) {
        http.createInstance({
          baseURL: env.jsonPlaceholderUrl,
        });
      }
    }
    ```

- `repositories`: Ponte entre as regras de negocio e base de dados.

  - Todas as repositories deve extender a classe `Repository` e informar o tipo do repository com base na `entity`.
  - Deve implementar o contrato definido na camada `core`.
  - Deve injetar o knex no construtor(cadastrado no conteiner como `mysqlDatabase`).

  ```typescript
  @injectable()
  @table('users')
  export class UserRepository
    extends Repository<User>
    implements IUserRepository {
    constructor(@inject('mysqlDatabase') protected database: Knex) {
      super();
    }
  }
  ```

---

## Main Layer

- Camada mais acoplada da arquitetura.

- `container`: Diretório onde as classes serão cadastradas para realizar a injeção de dependências(Devem ser colocadas no arquivo `app-container.ts`)

  - `loadProviders`: Lista de todas as classes que serão injetadas(@inject(`NomeDaClasse`))

  - `loadConfigs`: Caso o valor a ser injetadado não seja uma classe, deve ser colocado neste método, sendo a chave do objeto
    o nome a ser injetado. (No exemplo abaixo temos o mysql_database`que será injetado no construtor dos`repositories`)

  ```typescript
  class AppContainer extends BaseContainer {
    loadProviders(): Function[] {
      return [
        HttpService,
        JsonPlaceHolderIntegration,
        ListUsersUseCase,
        ListUsersByIdUseCase,
        UserRepository,
        LogUserInfoProducer,
        FetchUsersUseCase,
      ];
    }

    loadConfigs(): any {
      return {
        mysql_database: new KnexConnection().getConnection(),
      };
    }
  }
  ```

- `env`: Diretório responsável por registrar as variáveis de ambiente:

  - `index.ts`: Realiza o tratamento das variáveis de ambiente, como por exemplo, passar o uma string para um int e definir valores default;
  - `validator.ts`: Utiliza o pacote de class-validator para validar a variável conforme a annotation;

  ```typescript
    @IsNotEmpty()
    @IsUrl()
    jsonPlaceholderUrl: string

    @IsInt()
    @IsNotEmpty()
    httpPort: number;
  ```

- `app.ts`: Arquivo que configura a inicialização dos módulos

  - A classe Application contém 2 métodos principais, o `loadModules` e o `start`:
    - `loadModules`: Lista de móludos que serão inicializados com a aplicação. Importante resaltar que se o projeto for fazer alguma integração com rabbitMQ, **este módulo deve vir primeiro na lista de módulos**, pois ele cadastrará o `vHost` que será injetado no consumer;
    - `start`: Inicializa os módulos listados no método `loadModules`;

---

## Presentation Layer

- Lida com a customização dos request e response através de adaptadores de interface.

  - `amqp`: Diretório onde se encontra os consumers da aplicação.

    - `consumers`:

      - Todos os consumers deverão ter a annotation de `@queue(nome da fila)` que irá informar de qual fila as mensagens serão consumidas
      - Todos os consumers deverão extender a classe `Consumer`;
      - Deve receber via injeção de dependência uma abstração de useCase(camada que contém as regras de negócio);
      - Para validação da mensagem utilizamos a annotation `@validation_schema` que verificará se a mensagem está como o esperado;
      - Todos os consumers deve ter os métodos `messageHandler` e `onConsumeError`;

        - `messageHandler`: Responsável por trabalhar com a mensagem vinda da fila
        - `onConsumeError`: Responsável por lidar com erros que podem ocorrer no consumo da mesma;

      - No exemplo abaixo apontamos para uma abstração de `ListUsersByIdUseCase`(`IListUsersByIdUseCase`) e informamos qual é a classe que vai substituir essa abstração em tempo de execução(`ListUsersByIdUseCase`);

        ```typescript
        @injectable()
        @queue('user.find')
        export class FindUserByIdConsumer extends Consumer {
          constructor(
            @inject('ListUsersByIdUseCase')
            private listUsersByIdUseCase: IListUsersByIdUseCase
          ) {
            super();
          }

          @validation_schema(find_user_schema)
          async messageHandler(message: FindUserMessage): Promise<void> {
            const user: User = await this.listUsersByIdUseCase.listById(
              message.id
            );
            logger.debug(JSON.stringify(user));
          }

          onConsumeError(
            err: Error,
            channel: Channel,
            message: ConsumeMessage | null
          ): void {
            logger.error(err);
          }
        }
        ```

- `http`: Lida com as requisições via http da aplicação:

  - `controllers`:

    - Todos os controllers devem conter a annotation `@version(/vx)` que define a versão da rota;
    - Devem conter também a annotation de definição de método http (`@get()`, `@post()`, `@delete`, `@put()`, `@path()`);

      - As annotations de métodos esperam 2 parâmetros sendo o primeiro uma string informando a rota e o segundo um array de middlewares:

        ```typescript
          @get('/users/:id', [validator_middleware(list_by_id_schema)])
        ```

    - Todos os controllers devem extender a `Controller`.
    - Deve receber via injeção de dependência uma abstração de useCase(camada que contém as regras de negócio);
    - Todos os controllers devem conter os métodos `handle` e `exception`;
      - `handle`: É responsável por lidar com a requisições http
        - Recebe como parâmetro um propriedade do tipo `HttpRequest`
        - Pode retornar um `void` ou um `HttpResponse`;
        - O método handle pode conter a annotations `@httpStatus(status)` que define o status a ser respondido ou retornar esse status no objeto de `HttpResponse`;
      - `exception`: É responsável pelo tratamento de erro que pode ocorrer no método `handler`
        - Deve sempre retornar um erro;

    ```typescript
    @version('/v1')
    @get('/users')
    @injectable()
    export class ListUsersController extends Controller {
      constructor(
        @inject('ListUsersUseCase') private listUsersUseCase: IListUsersUseCase
      ) {
        super();
      }

      @httpStatus(200)
      async handle(
        req: HttpRequest
      ): Promise<HttpResponse<ListUsersByIdResponse>> {
        const { id } = req.params;
        const user = await this.list_users_by_id_use_case.listById(id);

        return {
          data: {
            ...user,
            created_at: user.created_at.toISOString(),
            updated_at: user.updated_at.toISOString(),
          },
        };
      }

      exception(error: Error): Error {
        if (error instanceof UserNotFoundError) {
          const { code, message } = error;
          return new BadRequest(message, code);
        }

        return error;
      }
    }
    ```
