# Pub/Sub

> Publish or Subscribe message to channles that senders (publishers) can send their messages to specific receivers (subscribers). 

Lets create 2 Redis containers to do the lab.

```
$ docker pull redis
$ docker run --name my-redis -d redis
$ docker run -it -d --link my-redis:cachedb --entrypoint redis-cli --name my-redis-client redis -h cachedb 
```

> `my-redis` is the Redis server, and `my-redis-client` is the client.<br />
> You can also create 2 redis clients to do the lab. <br />
> [See more about how to create Redis containers here](https://github.com/KarateJB/eBooks/tree/master/Docker/10.%20Redis)


## Subscribe/Unsubscribe

In `my-redis-client`, use redis-cli to subscribe channel(s)

```
> SUBSCRIBE myChannel1 <myChannel2> <...>
```


To unsubscribe channel(s), 

```
> UNSUBSCRIBE [myChannel1] [myChannel2]
```



## Publish

In `my-redis`, check all channels which are subscribed.

```
> PUBSUB CHANNELS *
1) "myChannel1"
2) "myChannel2"
```


and then publish a message to a channel.

```
> PUBLISH myChannel1 "Hello, Channel1"
> PUBLISH myChannel2 "Hi, Channel2"
```

and `my-redis-client` will get the messages from Redis server like following,

```
Reading messages... (press Ctrl-C to quit)
1) "message"
2) "myChannel1"
3) "Hello, Channel1"
1) "message"
2) "myChannel2"
3) "Hi, Channel2"
```


## Pattern Subscribe/Unsubscribe

Use [PSUBSCRIBE](https://redis.io/commands/psubscribe) and [PUNSUBSCRIBE](https://redis.io/commands/punsubscribe) to do a pattern-matching subscription or unsubscription.

```
> PSUBSCRIBE myChannel*
```

Which will get the messages that are published to Channel5, Channel-JB, ... etc.

```
Reading messages... (press Ctrl-C to quit)
1) "pmessage"
2) "myChannel*"
3) "myChannel5"
4) "Test message to myChannel5"
1) "pmessage"
2) "myChannel*"
3) "myChannel-JB"
4) "Test message to myChannel-JB"
```

To unsubscribe, 

```
> PUNSUBSCRIBE myChannel*
```

