# Motivation

Been wanting to do this for awhile, the first version was awful and very basic.
It had no auth, and terrible UI, hopefully this project does not end up the
same way.

## Description

A simple 'confessions' site's backend.

Built with [Nest](https://github.com/nestjs/nest)

## Installation

```bash
$ npm install
```

- Ensure that database is up and running (refer `docker-compose.yml`)
- Use environment variables in production instead of hardcoded user and
  password for postgres

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
