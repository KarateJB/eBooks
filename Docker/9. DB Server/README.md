# MongoDB
---

## Run

```
$ docker run -d --name <my-mongo> mongo[:<tag>]
```

> Default port:`27017`

- See mongoDB's status

```
$ docker exec -it <my-mongo> sh
> show dbs
> db.stats()
```

## Connect to mongoDB

To use `mongo-cli` directly, run the container like this, 

```
$ docker run -it --entrypoint mongo --host db --link <my-mongo>:db  mongo[:<tag>] 
> db.version();
> db.stats();
> show dbs
```

## Custom Dockefile

```
FROM sshd
MAINTAINER <docker_user> (<duckeruser>@docker.com)

RUN apt-get update && \
    apt-get install -y mongo pwgen && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

## DB data's folder
RUN mkdir -p /data/db
VOLUME /data/db

ENV AUTH yes

# ADD
ADD run.sh /run.sh
ADD set_mongodb_password.sh /set_mongodb_password.sh
RUN chmod 755 */.sh

EXPOSE 27017
EXPOSE 28017

CMD ["/run.sh"]
```
