# Redis
---

## Create a Redis container

```bash
$ docker run --name my-redis -d redis
```

Now we can add a key-value into Redis.

```bash
$ docker exec -it my-redis bash

root@bbdd2299f1e0:/data# redis-cli
127.0.0.1:6379> keys *
(empty list or set)
127.0.0.1:6379> mset myname jb.lin
OK
127.0.0.1:6379> mget myname
"jb.lin"
```

## Dockerfile with custom redis.conf

```dockerfile
FROM redis:<tag>
COPY ./redis.conf /usr/local/etc/redis/redis.conf
CMD [ "redis-server", "/usr/local/etc/redis/redis.conf" ]
```



> We can set extra IPs for Redis service in *.conf like thism,
>
> `bind 127.0.0.1 192.xxx.xxx.xx`
>


## Connect to it


### Create client container

Use the redis image, which contains the [redis cli](https://redis.io/topics/rediscli).

```
$ docker run -it -d --link my-redis:cachedb --entrypoint redis-cli --name my-redis-client redis -h cachedb 
$ docker exec -it my-redis-client bash
root@8d8a6ce4fa05:/data# redis-cli -h cachedb
cachedb:6379> 
```



Or you can install the **redis-tools** in a ubuntu container.

```
$ docker run -it -d --link my-redis:cachedb --name my-redis-client ubuntu:14.04
$ docker exec -it my-redis-client bin/bash
root@580ac8ab1613:/# apt-get update
root@580ac8ab1613:/# apt-get -y install redis-tools
root@580ac8ab1613:/# redis-cli -h cachedb
cachedb:6379> 
```


## Reference

- [Redis Persistence](https://redis.io/topics/persistence)

