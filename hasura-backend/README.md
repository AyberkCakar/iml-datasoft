# Hasura Docker

## Run

The following command can be executed to up a local hasura environment:

```bash
docker-compose up -d
```

## Applying Migrations

Hasura service in our docker environment applies found migrations in its migration folder automatically on start.

So, after getting changes from master branch with:

```bash
git pull
```

Containers should be up with:

```bash
docker-compose up -d
```

or if they are already up, just restart them:

```bash
docker-compose restart
```

That's all. All migrations will be applied in your local server.

## Reaching Hasura Console

The following command can be executed to gain access to the hasura console:

```bash
docker-compose exec hasura hasura-cli console --console-port 64643 --no-browser --address 0.0.0.0
```

Hasura console will be available at <http://localhost:64643>

If there is an error, just try to execute the command again, since hasura may not be ready yet.

## Squashing Migrations

The following command can be executed to squash migrations into one migration from version `1589810113314`

```bash
docker-compose exec hasura hasura-cli migrate squash --name "<name>" --from 1589810113314
```

For detailed information see:

[Hasura CLI: hasura migrate squash](https://hasura.io/docs/1.0/graphql/manual/hasura-cli/hasura_migrate_squash.html)


## Database

PostgreSql is used as database. Database works integrated with hasura. The database consists of 9 tables.

```
  - users
  - simulators
  - simulator_parameters
  - real_datasets
  - failure_types
  - datasets
  - algorithms
  - algorithm_settings
  - algorithm_results

```
![IML-DATASOFT-ER](https://github.com/AyberkCakar/iml-datasoft-backend/assets/38071168/6c54d44f-9b5d-463a-b2c8-e6465569a632)

