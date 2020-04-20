# Redis CLI Commands


| Cmd |    Usage    | Return value | tags | Description |
|:----|:------------|:-------------|:----:|:------------|
| [EXISTS](https://redis.io/commands/exists) | `EXISTS <key>` | `1` : exist, or `0` : not exist) | `Key` | Check if the key exists. |
| [MEMORY USAGE](https://redis.io/commands/memory-usage) | `MEMORY USAGE <key>` | Size in bytes | `integer` | Get the size of a key |
| [DEL](https://redis.io/commands/del) | `DEL <key1> [<key2> ...]` | The number of keys that were removed. | `Key` | Delete one or multiple key(s) |
| [RENAME](https://redis.io/commands/rename) | `RENAME <key> <newKey>`  | `OK` or `(error) Err no such key` when the key doesn't exist | `Key` | When the newKey exists, it will do an implicit DEL operation. | 
| [GET](https://redis.io/commands/get) | `GET <key>` | The value | `Strings` |Get single key's value. |
| [SET](https://redis.io/commands/set) | `SET <key> <value>` | always `OK` | `Strings` | Set single key's value. |
| [SETNX](https://redis.io/commands/setnx) | `SETNX <key> <value>` | `1` : the key was set<br />`0` : if the key was not set | `Strings` | Only set the value to a key when the key is not exist. |
| [MGET](https://redis.io/commands/mget) | `MGET <key1> <key2> [...]` | The values | `Strings` | Set one or multiple key-value pairs. |
| [MSET](https://redis.io/commands/mset) | `MSET <key1> <value1> <key2> <value2> [...]` | always `OK` | `Strings` | Get one or multiple keys' values. |
| [MSETNX](https://redis.io/commands/msetnx) | `MSETNX <key> <value>`| `1` : the key was set<br />`0` : if the key was not set | `Strings` | Only set the values to keys when no any key is exist. |
| [GETSET](https://redis.io/commands/getset) | `GETSET <key> <new value>` | The old value or `nil` when the key don't exist | `Strings` | Return the old value and then set new value. |
| [INCR](https://redis.io/commands/incr) | `INCR <key>` | The value of key after increment | `Strings` | Increate the key's value by 1. |
| [INCRBY](https://redis.io/commands/incrby) | `INCRBY <key> <increment>` | The value of key after increment | `Strings` | Increate the key's value by a given increment. |
| [DECR](https://redis.io/commands/decr) | `DECR <key>` | The value of key after decrement | `Strings` | Decrease the key's value by 1. |
| [DECRBY](https://redis.io/commands/decrby) | `DECRBY <key> <decrement>` | The value of key after decrement | `Strings` | Decrease the key's value by a given decrement. |
| [RPUSH](https://redis.io/commands/rpush) | `RPUSH <key> <value1> [<value2>...]` | The length of the list | `List` | Postpend one or multiple values to a List. |
| [RPUSHX](https://redis.io/commands/rpushx) | `RPUSHX <key> <value>` | The length of the list, or 0 for non-exist key | `List` | Postpend a value to an exist list. |
| [LPUSH](https://redis.io/commands/lpush) | `LPUSH <key> <value1> [<value2>...]` | The length of the list | `List` | Prepend one or multiple values to a List. |
| [LPUSHX](https://redis.io/commands/lpushx) | `LPUSHX <key> <value>` | The length of the list, or 0 for non-exist key | `List` | Prepend a value to an exist list. |
| [LRANGE](https://redis.io/commands/lrange) | `LRANGE <key> <start> <stop>` | Elements | `List` | List elements in the specified range. Notice when `<start>` or `<stop>` is a negative number, such as -1, it means the last element in the list, -2 is the penultimate, and so on. |
| [RPOP](https://redis.io/commands/rpop) | `RPOP <key>` | The pop value | `List` | Pop (Remove and return) the last value from the list. Notice the key will be removed if all elements are pop out |
| [LPOP](https://redis.io/commands/lpop) | `LPOP <key>` | The pop value | `List` | Pop (Remove and return) the firsr value from the list. Notice the key will be removed if all elements are pop out.  |
| [SADD](https://redis.io/commands/sadd) | `SADD <key> <value1> [<value2> ... ]`| The number of members being added this time | `Set` | Add the specified members to the set |
| [SMEMBERS](https://redis.io/commands/smembers) | `SMEMBERS <key>` | All members | `Set` | Returns all the members of the set value stored at key. | 
| [SISMEMBER](https://redis.io/commands/sismember) | `SISMEMBER <key> <value>` | `1` : Yes<br />`0` : No | `Set` | Check is the value is the memeber of the key. | 
| [SINTER](https://redis.io/commands/sinter) | `SINTER <key1> <key2> [<key3>...]` | List of members | `Set` | The intersection of all the given sets. | 
| [SRANDMEMBER](https://redis.io/commands/srandmember) | `SRANDMEMBER <key> [<count>]` |  Members | `Set` | Return random memeber(s) from a set | 
| [SPOP](https://redis.io/commands/stop) | `SPOP <key> [<count>]` | Members | `Set` | Removes and returns random member(s) from a set | 
| [ZADD](https://redis.io/commands/zadd) | `ZADD <key> <score1> <member1> [<score2> <member2> ... ]` | The number of members being added this time | `Sorted Set` | Add the specified members to the zset with scores | 
| [ZRANGE](https://redis.io/commands/zrange) | `ZRANGE <key> <start> <stop>` | Members | `Sorted Set` | List members in the specified range ascending. Notice when `<start>` or `<stop>` is a negative number, such as -1, it means the last element in the list, -2 is the penultimate, and so on. | 
| [ZREVRANGE](https://redis.io/commands/zrevrange) | `ZREVRANGE <key> <start> <stop>` | Members | `Sorted Set` | Like `ZRANGE`, but descending | 
| [ZRANGEBYSCORE](https://redis.io/commands/zrangebyscore) | `ZRANGEBYSCORE <key> <min> <max>` | Members | `Sorted Set` | List members in a range | 
| [ZRANK](https://redis.io/commands/zrank) | `ZRANK <key> <member>` | Ranking(integer) or `nil` if not exist | `Sorted Set` | Get the rank of member in the sorted set | 
| [SETBIT](https://redis.io/commands/setbit) | `SETBIT <key> <offset> <value>` | The original bit value stored at offset | `Bitmaps` | See [stackoverflow](https://stackoverflow.com/a/20677400/7045253) | 
| [BITCOUNT](https://redis.io/commands/bitcount) | `BITCOUNT <key>` | Number of bits set to 1 | | 
| [HMSET](https://redis.io/commands/hmset) | `HMSET <key> <field1> <value1> [<field2> <value2> ...]` | always `OK` | `Hash` | | 
| [HGETALL](https://redis.io/commands/hgetall) | `HGETALL <key>` | List of fields and their values stored in the hash, or an empty list when key does not exist | `Hash` | |  
| [HGET](https://redis.io/commands/hget) | `HGET <key> <field>` | The value of the field | `Hash` | Returns the value associated with field in the hash | 
| [HMGET](https://redis.io/commands/hmget) | `HMGET <key> <field1> [<field2> ...]` | The values of the fields | `Hash` | Returns the values associated with fields in the hash | 
| [EXPIRE](https://redis.io/commands/expire) | `EXPIRE <key> <seconds>` | `1` : the timeout was set successfully<br />0 : the key does not exist. | `Key`,`Expire` | Set a time-to-live to a key in seconds. | 
| [PEXPIRE](https://redis.io/commands/pexpire) | `PEXPIRE <key> <milliseconds>` | `1` : the timeout was set successfully<br />0 : the key does not exist. | `Key`,`Expire` | Set a time-to-live to a key in milliseconds. | 
| [EXPIREAT](https://redis.io/commands/expireat) | `EXPIREAT <key> <timestamp>` | `1` : the timeout was set successfully<br />0 : the key does not exist.  | `Key`,`Expire` | Give an absolute Unix timestamp (seconds). A timestamp in the past will delete the key immediately. |
| [PEXPIREAT](https://redis.io/commands/expireat) | `PEXPIREAT <key> <timestamp>` | `1` : the timeout was set successfully<br />0 : the key does not exist.  | `Key`,`Expire` | Give an absolute Unix timestamp (milliseconds). A timestamp in the past will delete the key immediately. |
| [TTL](https://redis.io/commands/ttl) | `TTL <key>` | `-2` : the key does not exist<br />`-1` : the key exists but not setting an timeout<br />`>0` : Left expired time in seconds | `Key`,`Expire` | | 
| [PTTL](https://redis.io/commands/pttl) | `PTTL <key>` | `-2` : the key does not exist<br />`-1` : the key exists but not setting an timeout<br />`>0` : Left expired time in milliseconds | `Key`,`Expire` | | 
| [PERSIST](https://redis.io/commands/persist) | `PERSIST <key>` | `1` : the timeout was removed successfully<br />`0` : if key does not exist or does not have an associated timeout | `Key`,`Expire` | Remove the existing timeout on key, turning the key to persistent |
| [PUBLISH](https://redis.io/commands/publish) | `PUBLISH <channel> <message>` | The number of clients that received the message. | | Publish a message to channel |
| [SUBSCRIBE](https://redis.io/commands/subscribe) | `SUBSCRIBE <channel1> [<channel2> ...]` | | | Subscribe channel(s) |
| [PSUBSCRIBE](https://redis.io/commands/psubscribe) | `PSUBSCRIBE <pattern> [<pattern> ...]` | | | Subscribes chennel(s) of given patterns. |
| [UNSUBSCRIBE](https://redis.io/commands/unsubscribe) | `UNSUBSCRIBE` or `UNSUBSCRIBE <channel1> [<channel2> ...]` | | | Unsubscribe channel(s) |
| [PUNSUBSCRIBE](https://redis.io/commands/punsubscribe) | `PUNSUBSCRIBE` or `PUNSUBSCRIBE <pattern> [<pattern> ...]` | | | Unsubscribe channel(s) of given patterns |
| [DEBUG OBJECT](https://redis.io/commands/debug-object) | `DEBUG OBJECT <key>` | e.q. Value at:0x7fd1362666e0 refcount:1 encoding:hashtable serializedlength:4073 lru:10294174 lru_seconds_idle:410 | | Show the detail of a key |
| | | | | |
| | | | | |
| | | | | |




# REDIS CLI arguments

| Argument |    Usage   | Return value | Description |
|:---------|:-----------|:-------------|:------------|
| bigkeys | redis-cli --bigkeys |  | Show the bigest keys |

