# Expires

> Set a timeout on key. After the timeout has expired, the key will automatically be deleted. 

## Set a time-to-live timeout

```
$ EXPIRE <key> <seconds>
$ PEXPIRE <key> <milliseconds>
```



## Set a absolute-date timeout

```
$ EXPIREAT <key> <timestamp_in_seconds>
$ PEXPIREAT <key> <timestamp_in_milliseconds>
```


## See the left time-to-live

- Returns the remaining time to live of a key in seconds 
```
$ TTL <key>
```

- Returns the remaining time to live of a key in millionseconds 
```
$ PTTL <key>
```


---

ex.
```
$ redis-cli SET key1 "Test"
"OK"
$ redis-cli EXPIRE key1 10
(integer) 1
$ redis-cli TTL key1
(integer) 8
$ redis-cli PTTL key1
(integer) 6
$ redis-cli PTTL key1
(integer) 2
$ redis-cli PTTL key1
(integer) 0
$ redis-cli PTTL key1
(integer) -2
$ redis-cli GET key1
(nil)
```

ex.
```
$ redis-cli SET key2 "Test"
"OK"
$ redis-cli EXPIREAT key2 1532908800
(integer) 1
$ redis-cli TTL key1
(integer) 243305
```

---


1. The timeout will only be cleared by commands that delete or overwrite the contents of the key, including [DEL](https://redis.io/commands/del), SET(https://redis.io/commands/set), GETSET(https://redis.io/commands/getset) and all the `*STORE` commands. 
2. The timeout can also be cleared, turning the key back into a persistent key, using the [PERSIST](https://redis.io/commands/persist) command.
3. If a key is renamed with [RENAME](https://redis.io/commands/rename), the associated time to live is transferred to the new key name.
   If the new key's name exists when doing `RENAME`, for example `RENAME key1 key2`, the final characteristics on key2 will be the ones on key1, cus `RENAME` will do `DEL key2` in this case.
4. Note that calling [EXPIRE](https://redis.io/commands/expire)/[PEXPIRE](https://redis.io/commands/pexpire) with a non-positive timeout or [EXPIREAT](https://redis.io/commands/expireat)/[PEXPIREAT]((https://redis.io/commands/pexpireat) with a time in the past will result in the key being deleted rather than expired (accordingly, the emitted key event will be `del`, not `expired`).



## Make a key to persistent

```
$ redis-cli SET key1 "Test"
"OK"
$ redis-cli EXPIRE key1 1000
(integer) 1
$ redis-cli TTL key1
(integer) 998
$ redis-cli PERSIST key1
(integer) 1
$ redis-cli TTL key1
(integer) -1
```

## Refreshing expires

Use `EXPIRE`, `PEXPIRE`, `EXPIREAT`, `PEXPIREAT` again on a living key will update the timeout.



## How Redis expires keys

See [Redis document](https://redis.io/commands/expire#how-redis-expires-keys)




## Reference

- [EXPIRE key seconds](https://redis.io/commands/expire#how-redis-expires-keys)