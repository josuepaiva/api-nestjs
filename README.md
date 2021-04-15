<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Instalação com docker

#### Variáveis do .env
* PORT_SERVER - porta que o servidor nest irá rodar
* DB_HOST - host db no formato mongodb://host/dbname
* DB_PORT - porta que será exposta do container
* URL_SHOPIFY - url para pegar os produtos da shopify
* SECRET - secredo usado no token jwt
* NODE_ENV - pode ser production ou development
* EXPIRE - tempo de expiração do token jwt
* RABBITMQL_PORT- porta que será exposta o container do rabbitmql
* QUEUE_URL - url da fila no formato amqp://user:user@host
* QUEUE_NAME - nome da fila é obrigatório ter
* EXCHANGE_NAME - nome da exchange é obrigatório ter
* EMAIL_HOST - host do email exemplo smtp.mailtrap.io
* EMAIL_PORT - porta do serviço de email
* EMAIL_USER - usuário do provedor de email
* EMAIL_PASS - senha do provedor de email
* TIMEOUT - timeout das requisições do HttpModule
* RETRIES - quantidade de tentativas usadas no HttpModule
* WAIT_SEND_EMAIL - tempo de espera em milesegundos para o envio do email

1. Instalar o docker.
2. Instalar o `docker-compose`.

3. Clone este repositório:

    ```shell
    cd /test-aftersale
    ```

4. Crie um arquivo chamado .env com o conteúdo `.env.example` e preencha os campos:

    ```shell
    cp .env.example .env
    vi .env
    ```

5. Crie e levante o container usando o `docker-compose`:

    ```
    docker-compose up -d
    ```

6. Para acessar o serviço `http://localhost:${PORT}`.

## Instação com yarn

```bash
$ yarn
```

## Rodando o app

```bash
# development
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## Documentação
Após levantar a api acessar http://localhost:${PORT_SERVER}/api
## License

Nest is [MIT licensed](LICENSE).
