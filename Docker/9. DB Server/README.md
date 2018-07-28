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

`set_mongodb_user_pwd.sh` is the script to set User id and Password.


* set_mongodb_user_pwd.sh

```
#!/bin/bash

#Check if already set the password
if[ -f /.mongodb_password_set ]; then
    echo "MongoDB's password had been set!"
    exit 0

fi

/usr/bin/mongod --smallfiles --nojournal &

PASS=${MONGODB_PASS:-$(pwgen -s 12 1)}
_word=$( [ ${MONGODB_PASS} ] ) && echo "preset" || echo "random"

RET=1
while [[ RET -ne 0 ]]; do
    echo "=>Waiting for confirmation of MongoDB service startup"
    sleep 5
    mongo admin --eval "help" > /dev/null 2>&1
    RET=$?
done

echo "=> Creating as admin user with ${_word} password in MongoDB"
mongo admin --eval "db.adduser({user: 'admin', pwd: '$PASS', roles: ['userAdminAnyDatabase', 'dbAdminAnyDatabase']});"
mongo admin --eval "db.shutdownServer();"

echo "=> Done!"
touch /.mongodb_password_set

echo "========================================"
echo "You can now connect to the MongoDB server with:"
echo ""
echo "  mongo admin -u admin -p $PASS --host <host> --port <port>"
echo ""
echo "Pls remeber to change the above password asap"
echo "========================================"
```

* run.sh

```
#!/bin/bash
if [ ! -f /mongodb_password_set]; then
    /set_mongo_password.sh

fi

if [ "$AUTH" == "yes"]; then
    # Set startup parameters here
    export mongodb='/usr/bin/mongod --nojournal --auth --httpinterface --rest'
else
    export mongodb='/usr/bin/mongod --nojournal  --httpinterface --rest' 

fi
```
