# Monte Cine
API construída em NestJs para gerenciar uma biblioteca de streaming de filmes livres.

## 🛠️ Construído com

* [NestJs](https://nestjs.com/) - Um framework para a construção de aplicativos Node.js eficientes e escaláveis.
* [TypeORM](https://typeorm.io/) - Um ORM que pode ser executado em Node.js, usado para interagir com bancos de dados.
* [Migrations](https://typeorm.io/#/migrations) - Usado para controlar mudanças no banco de dados de forma organizada e segura.
* [DDD](https://martinfowler.com/bliki/DomainDrivenDesign.html) - Domain-Driven Design, uma abordagem para o design de software complexos, baseando-se na modelagem de domínios.
* [SOLID](https://en.wikipedia.org/wiki/SOLID) - Um acrônimo que representa cinco princípios de design que facilitam a escalabilidade e manutenção do software.
* [Cache](https://docs.nestjs.com/techniques/caching) - Usado para melhorar a performance armazenando respostas de forma temporária.
* [Husky](https://img.shields.io/badge/-Husky-%2334292F?logo=husky&style=flat-square): Utilizado para padronizar o projeto executando formatação e linting automaticamente.
* Swagger: Utilizado para documentar APIs automaticamente.

### 📋 Pré-requisitos

Você precisará de:

- Node na versão 18 ou superior
- Docker
- VsCode ou editor de sua preferência
- NPM ou YARN

### 🔧 Instalação e inicio

- Adicione as variáveis de ambiente, seguindo o exemplo do .env.example na raiz do projeto

- Instale as depêndencias do projeto:

```
yarn
```

- Suba o container com banco dados e aplicação:

```
docker-compose up
```

### 🔧 Se preferir rode localmente na sua máquina seguindo os passos abaixo

- Remova o app e migrations do docker-compose

- Suba o container com banco dados:

```
docker-compose up
```

- Rode as migrations:

```
yarn migration:run
```

- Inicie seu app:

```
yarn start:dev
```

## ⚙️ Executando os testes

```
yarn test
```

