## Description

Basic chat application. Before running Docker container, change env variable POSTGRES_HOST from 'localhost' to 'postgres'

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run container
```bash
# before running set env variable POSTGRES_HOST from 'localhost' to 'postgres'
$ docker-compose up --buid
```