# Polls

This project, developed during the [Rocketseat](https://www.rocketseat.com.br/) Next Level Week event, Expert edition, enables the creation of polls and facilitates voting on them. The polls are stored in a PostgreSQL database, with the application utilizing the Prisma ORM for this purpose. Additionally, the API incorporates a Websocket connection, through which updates on individual poll votes are broadcasted each time a user casts their vote. Redis is employed to manage the rankings of the poll votes.

# Getting Started

## Versions

Node v20.10.0

## Installations

```bash
yarn install
```

## Environment Variables

Create a new `.env` file inside the project root, and define your database URL using the content below and replacing the `<user` and `<password` by the database user and password respectively.

`.env`:

```
DATABASE_URL="postgresql://<user>:<password>@localhost:5432/polls?schema=public"
```

## Running Docker images

```bash
docker compose up -d
```

This will start a PostgreSQL instance and a Redis instance on Docker.

## Running migrations

This will run all migrations creating the tables and other configs inside the database.

```bash
yarn prisma db push
```

## Running

```bash
yarn dev
```

The API will be running on `http://localhost:3333` and websocket on `ws://localhost:3333`.

## Routes

| Route                  | Method | Protocol | Description                                    |
| ---------------------- | ------ | -------- | ---------------------------------------------- |
| /polls                 | POST   | HTTP     | Create a new poll.                             |
| /polls/:pollId         | GET    | HTTP     | Get a single poll.                             |
| /polls/:pollId/vote    | POST   | HTTP     | Vote on a poll option.                         |
| /polls/:pollId/results | --     | WS       | Open a WS connection to receive votes results. |


## 🔗  Technologies


![Node.js Badge](https://img.shields.io/badge/-Node.js-1e293b?logo=node.js&logoColor=white)
![Typescript Badge](https://img.shields.io/badge/-Typescript-1e293b?logo=typescript&logoColor=white)
![Docker Badge](https://img.shields.io/badge/-Docker-1e293b?logo=docker&logoColor=white)
![PostgreSQL Badge](https://img.shields.io/badge/-PostgreSQL-1e293b?logo=postgresql&logoColor=white)
![Redis Badge](https://img.shields.io/badge/-Redis-1e293b?logo=redis&logoColor=white)
