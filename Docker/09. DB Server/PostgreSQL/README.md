# PostgreSQL
---

## Run

```
$ docker run --name <container_name> -d -p 5432:5432 -v <local_path>:/var/lib/postgresql/data -e POSTGRES_DB=<db_name> -e POSTGRES_USER='<user_name>' -e POSTGRES_PASSWORD='<user_pwd>' postgres[:<tag>]
```

Environment variables ([Reference](https://github.com/GoogleCloudPlatform/postgresql-docker/blob/master/9/README.md#environment-variables)):

| Variable | Description | Required | Default value | 
|:---------|:------------|:--------:|:--------------|
| POSTGRES_DB | Specifies the name of the default database to be created when the image is first started |  | The value of $POSTGRES_USER | 
| POSTGRES_USER | Superuser's name | | `postgres` | 
| POSTGRES_PASSWORD | Password | Yes | |
| POSTGRES_INITDB_ARGS | Arguments to postgres initdb. For example, `--data-checksums --encoding=UTF8` |  | |




For example, 

```
$ docker run --name demo-postgres -d -p 5432:5432 -v /lab/postgres:/var/lib/postgresql/data -e POSTGRES_DB=Demo -e POSTGRES_USER=admin -e POSTGRES_PASSWORD='12qwaszx' postgres:10
```
