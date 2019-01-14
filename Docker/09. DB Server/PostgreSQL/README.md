# PostgreSQL
---

### Pull images

> [Docker hub](https://hub.docker.com/_/postgres)

```
$ docker pull postgres:<tag>
```
 
### Run

```
$ docker run -d --name <container_name> -d -p 5432:5432 -v <local_path>:/var/lib/postgresql/data -e POSTGRES_DB=<db_name> -e POSTGRES_USER='<user_name>' -e POSTGRES_PASSWORD='<user_pwd>' postgres[:<tag>]
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
$ docker run -d --name demo-postgres -d -p 5432:5432 -v /postgres:/var/lib/postgresql/data -e POSTGRES_DB=Demo -e POSTGRES_USER=admin -e POSTGRES_PASSWORD='12qwaszx' postgres:10
$ docker start demo-postgres
$ docker port demo-postgres
5432/tcp -> 0.0.0.0:5432
```


## pgAdmin 4


> [Docker hub](https://hub.docker.com/r/dpage/pgadmin4/)

```
$ docker pull dpage/pgadmin4:<tag> 
```

### Run 

```
$ docker -d run -p <port>:80 --name <container_name> \
        -e "PGADMIN_DEFAULT_EMAIL=<your_email_address>" \
        -e "PGADMIN_DEFAULT_PASSWORD=<your_password>" \
        -d dpage/pgadmin4:<tag>
```

Environment variables ([Reference](https://hub.docker.com/r/dpage/pgadmin4/)):

| Variable | Description | Required | Default value | 
|:---------|:------------|:--------:|:--------------|
| PGADMIN_DEFAULT_EMAIL | The initial administrator account to login to pgAdmin | Yes | |
| PGADMIN_DEFAULT_PASSWORD | the initial administrator account's password | | |
| PGADMIN_ENABLE_TLS | If set to any value, the container will listen on port 443 for TLS connections | | `null` |
| PGADMIN_LISTEN_PORT | Port | | `80` or `443`(if `PGADMIN_ENABLE_TLS` is enabled) |
| GUNICORN_THREADS | The number of threads for handling incoming requests in Gunicorn (web server). Increase it in a highly-loaded environment | | `25` |


> Notice if the TLS connection is enabled, a certificate and key must be provided and mounted to container's 
> - /certs/server.crt 
> - /certs/server.key



For example,

```
$ docker run -d -p 5431:80 --name demo-pgadmin \
        -v /postgres/pgadmin/data:/var/lib/pgadmin \
        -v "/postgres/pgadmin/servers.json:/servers.json" \
        -e "PGADMIN_DEFAULT_EMAIL=xxx@gmail.com" \
        -e "PGADMIN_DEFAULT_PASSWORD=12qwaszx" \
        -d dpage/pgadmin4:4
$ docker start demo-pgadmin
$ docker port demo-pgadmin 
```

Enable TLS connection:

```
docker run -p 443:443 \
        
        -v "/path/to/certificate.cert:/certs/server.cert" \
        -v "/path/to/certificate.key:/certs/server.key" \
        -v "/tmp/servers.json:/servers.json" \
        -e "PGADMIN_DEFAULT_EMAIL=xxx@domain.com" \
        -e "PGADMIN_DEFAULT_PASSWORD=xxxxxxx" \
        -e "PGADMIN_ENABLE_TLS=True" \
        -d dpage/pgadmin4:4
```


![](assets/001.png)





