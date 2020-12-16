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
> mongo
MongoDB shell version v4.0.0
Welcome to the MongoDB shell

> db.version()
4.0.0

> show dbs
admin  0.000GB
config 0.000GB
local  0.000GB

> db.stats()
{
    "db" : "test",
    "collections" : 0,
    "objects" : 0,
    "dataSize" : 0,0,
    "numExtents" : 0,,
    "indexSize" : 0,
    "fileSize" : 0,
    "fsTotalSize" : 0,
    "ok" : 1
}

> exit
bye
```

## Connect to mongoDB in another container

To use the db server's `mongo-cli` from another container, run the container like this,

```
$ docker run -it --link <my-mongo-container>:<alias> db --entrypoint mongo <image>[:<tag>] --host db
```

ex.
```
$ docker run -it --link my-mongo:db --entrypoint mongo --name mongo-client mongo:4.0.0 --host db
```


## Custom Dockefile


> Notice that we will use the Mongodb 3.0.X in this example. <br />
> However, if we would like to install the new versions of Mongodb, we have to update the local package database manually.<br />
> See more details on [Install MongoDB on Ubuntu](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/#using-deb-packages-recommended)


```
FROM karatejb/ubuntu-sshd:0.01
MAINTAINER <docker_user> (<duckeruser>@docker.com)

RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10 && \
    echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb.list && \
    apt-get update && \
    apt-get install -y mongodb-org=3.0.15 pwgen && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

## DB data's folder
RUN mkdir -p /data/db
VOLUME /data/db

ENV AUTH yes

# ADD
ADD run.sh /run.sh
ADD set_mongodb_pwd.sh /set_mongodb_pwd.sh
RUN chmod 755 ./*.sh

EXPOSE 27017
EXPOSE 28017

CMD ["/run.sh"]
```

`set_mongodb_pwd.sh` is the script to set User id and Password.


* set_mongodb_pwd.sh

```
#!/bin/bash

#Check if already set the password
if [ -f /.mongodb_password_set ]; then
    echo "MongoDB's password had been set!"
    exit 0

fi

/usr/bin/mongod --smallfiles --nojournal &

PASS=${MONGODB_PASS:-$(pwgen -s 12 1)}
_word=$( [ ${MONGODB_PASS} ] && echo "preset" || echo "random" )

RET=1
while [[ RET -ne 0 ]]; do
    echo "=> Waiting for confirmation of MongoDB service startup"
    sleep 5
    mongo admin --eval "help" > /dev/null 2>&1
    RET=$?
done

# Use docker logs + id to see the following output
echo "=> Creating an admin user with ${_word} password in MongoDB"
mongo admin --eval "db.createUser({user: 'admin', pwd: '$PASS', roles: [ { role: 'root', db: 'admin' } ]});"
mongo admin --eval "db.shutdownServer();"

echo "=> Done!"
touch /.mongodb_password_set

echo "========================================"
echo "You can now connect to the MongoDB server by"
echo ""
echo "  mongo admin -u admin -p $PASS --host <host> --port <port>"
echo ""
echo "Pls remeber to change the above password asap"
echo "========================================"
```

* run.sh

```
#!/bin/bash
if [ ! -f /.mongodb_password_set ]; then
    /set_mongodb_pwd.sh

fi

if [ "$AUTH" == "yes" ]; then
    # Set startup parameters here
    export mongodb='/usr/bin/mongod --nojournal --auth --rest'
else
    export mongodb='/usr/bin/mongod --nojournal --rest' 

fi

if [ ! -f /data/db/mongod.lock ]; then
    eval $mongodb
else
    export mongodb=$mongodb' --dbpath /data/db'
    rm /data/db/mongod.lock
    mongod --dbpath /data/db --repair && eval $mongodb
fi
```

Now build the image,

```
$ docker build -t mongodb-pure .
```

and start a container,

```
$ docker run -d -p 27017:27017 -p 28017:28017 --name my-mongo mongodb-pure
```

To see the default admin's password, use `docker logs`

```
$ docker logs my-mongo
```

or change the default passwrod when starting the container,

```
$ docker run -d -p 27017:27017 -p 28017:28017 -e MONGODB_PASS="xxxxx" --name my-mongo mongodb-pure
```

or access MongoDB without password,

```
$ docker run -d -p 27017:27017 -p 28017:28017 -e AUTH=no --name my-mongo mongodb-pure
```


### Login to MongoyDB locally

Since we create a user `admin` for `admin` database, we can login to it by  `mongo admin -u <user name> -p <password>`.

```
$ docker exec -it my-mongo sh
# mongo admin -u admin -p xxxxxxx
> db.createUser(
  {
    user: "jb",
    pwd: "1234qwer",
    roles: [ { role: "root", db: "admin" } ]
  });
> db.getUsers();
```


### Login to MongoyDB remotely

Now we will create another MongoDB client container and collect to the previous MongoDB server by the new user: `jb`.

```
$ docker run --it mongo:3.0.15 sh
# mongo admin -u jb -p 1234qwer --host 192.168.XX.XXX --port 27017
```



## Reference

- [Install MongoDB on Ubuntu](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/#using-deb-packages-recommended)
- [Connect to MongoDB via Mongo Shell](https://docs.mongodb.com/tutorials/connect-to-mongodb-shell/) 
- [Unable to locate package mongodb-org (stackoverflow)](https://stackoverflow.com/a/28966356/7045253)
