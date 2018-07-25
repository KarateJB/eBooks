# Commands

| Cmd | Usage | Return value | Description |
|:----|:------|:-------------|:------------|
| GET | `GET <key>` | The value | Get single key's value. |
| SET | `SET <key> <value>` | always `OK` | Set single key's value. |
| SETNX | `SETNX <key> <value>` | `1` : the key was set<br />`0` : if the key was not set | Only set the value to a key when the key is not exist. |
| MGET | `MGET <key1> <key2> [...]` | The values | Set one or multiple key-value pairs. |
| MSET | `MSET <key1> <value1> <key2> <value2> [...]` | always `OK` | Get one or multiple keys' values. |
| MSETNX | `MSETNX <key> <value>`| `1` : the key was set<br />`0` : if the key was not set | Only set the values to keys when no any key is exist. |
| GETSET | `GETSET <key> <new value>` | The old value or `nil` when the key don't exist | Return the old value and then set new value. |
| EXISTS | `EXISTS <key>` | `1` : exist, or `0` : not exist) | Check if the key exists. |
| INCR | `INCR <key>` | The value of key after increment | Increate the key's value by 1. |
| INCRBY | `INCRBY <key> <increment>` | The value of key after increment | Increate the key's value by a given increment. |
| DECR | `DECR <key>` | The value of key after decrement | Decrease the key's value by 1. |
| DECRBY | `DECRBY <key> <decrement>` | The value of key after decrement | Decrease the key's value by a given decrement. |
| DEL | `DEL <key1> [<key2> ...]` | The number of keys that were removed. | Delete one or multiple key-value pairs. |
| RPUSH | `RPUSH <key> <value1> [<value2>...]` | The length of the list | Postpend one or multiple values to a List. |
| RPUSHX | `RPUSHX <key> <value>` | The length of the list, or 0 for non-exist key | Postpend a value to an exist list. |
| LPUSH | `LPUSH <key> <value1> [<value2>...]` | The length of the list | Prepend one or multiple values to a List. |
| LPUSHX | `LPUSHX <key> <value>` | The length of the list, or 0 for non-exist key | Prepend a value to an exist list. |
| LRANGE | `LRANGE <key> <start> <stop>` | Elements | List elements in the specified range. Notice when `<start>` or `<stop>` is a negative number, such as -1, it means the last element in the list, -2 is the penultimate, and so on. |
| RPOP | `RPOP <key>` | The pop value | Pop (Remove and return) the last value from the list. Notice the key will be removed if all elements are pop out |
| LPOP | `LPOP <key>` | The pop value | Pop (Remove and return) the firsr value from the list. Notice the key will be removed if all elements are pop out.  |
| SADD | `SADD <key> <value1> [<value2> ... ]`| The number of members being added this time | Add the specified members to the set | 
| SMEMBERS | `SMEMBERS <key>` | All members | Returns all the members of the set value stored at key. | 
| SISMEMBER | `SISMEMBER <key> <value>` | `1` : Yes<br />`0` : No | Check is the value is the memeber of the key. | 
| SINTER | `SINTER <key1> <key2> [<key3>...]` | List of members | The intersection of all the given sets. | 
| SRANDMEMBER | `SRANDMEMBER <key> [<count>]` |  Members | Return random memeber(s) from a set | 
| SPOP | `SPOP <key> [<count>]` | Members | Removes and returns random member(s) from a set | 
| [ZADD](https://redis.io/commands/zadd) | `ZADD <key> <score1> <member1> [<score2> <member2> ... ]` |  The number of members being added this time | Add the specified members to the zset with scores | 
| ZRANGE | `ZRANGE <key> <start> <stop>` | Members | List members in the specified range ascending. Notice when `<start>` or `<stop>` is a negative number, such as -1, it means the last element in the list, -2 is the penultimate, and so on. | 
| ZREVRANGE | `ZREVRANGE <key> <start> <stop>` | Members | Like `ZRANGE`, but descending | 
| [ZRANGEBYSCORE](https://redis.io/commands/zrangebyscore) | `ZRANGEBYSCORE <key> <min> <max>` | Members | List members in a range | 
| [ZRANK](https://redis.io/commands/zrank) | `ZRANK <key> <member>` | Ranking(integer) or `nil` if not exist | Get the rank of member in the sorted set | 
| [SETBIT](https://redis.io/commands/setbit) | `SETBIT <key> <offset> <value>` | The original bit value stored at offset  | See [stackoverflow](https://stackoverflow.com/a/20677400/7045253) | 
| [BITCOUNT](https://redis.io/commands/bitcount) | `BITCOUNT <key>` | Number of bits set to 1 | | 
| [HMSET](https://redis.io/commands/hmset) | `HMSET <key> <field1> <value1> [<field2> <value2> ...]` | always `OK` | | 
| [HGETALL](https://redis.io/commands/hgetall) | `HGETALL <key>` | List of fields and their values stored in the hash, or an empty list when key does not exist |  
| [HGET](https://redis.io/commands/hget) | `HGET <key> <field>` | The value of the field | Returns the value associated with field in the hash | 
| [HMGET](https://redis.io/commands/hmget) | `HMGET <key> <field1> [<field2> ...]` | The values of the fields | Returns the values associated with fields in the hash | 
| | | | | 


