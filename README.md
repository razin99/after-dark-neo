# Motivation

Been wanting to do this for awhile, the first version was awful and very basic.
It had no auth, and terrible UI, hopefully this project does not end up the
same way.

## Description

A simple twitter like(?) site's backend. You can post something, and that's it.

Uses firestore to store data and session. Initially uses postgres for data and
redis for session storage, but I decided that its a bit expensive (not free) to
run on google cloud.

`auth` calls are through normal RESTful endpoints, everything else goes through
graphql.

Built with [Nest](https://github.com/nestjs/nest)

## Installation

```bash
$ npm install
```

- When running locally, ensure that firestore and redis is running:
  `docker-compose up`

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
Test coverage is still bad, to the point that its almost pointless running
these
```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
