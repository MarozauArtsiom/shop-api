# HOW TO RUN DYNAMO DB LOCALLY

## Prerequisites

Before you can run DynamoDB locally, you need to have Docker installed on your machine. Follow the instructions in the [Docker Installation Guide](https://docs.docker.com/engine/install/) to get Docker up and running.

## Commands

```bash
docker-compose down
docker-compose build
docker-compose up
```

## Get all tables

```bash
 aws dynamodb list-tables --endpoint-url http://localhost:8000 --region local
```
