# Data types


> Redis is not a plain key-value store, it is actually a data structures server, supporting different kinds of values.

- Notice that the `key` and `value` are **binary-safe**. 
- The maximum allowed key size is 512 MB.

| Type | Limit | Description |
|:-----|:------|:-----------|
| Strings | 512MB | Binary safe |
| Lists | 2^32-1=4,294,967,295 elements | List of Strings, order by insertion methods. |
| Sets | 2^32-1=4,294,967,295 elements | 1. Un-ordered collection of non-repeating Strings<br />2. Can be add or remove<br />3. Duplicate values are not allowed, so *check exist then add* operation is non-neccessary  |  |
| Sorted Sets | 2^32-1=4,294,967,295 elements | Like `Sets`, but the elements can be sorted by the **Score**. Often being used for indexing data |
| Hashs | 2^32-1=4,294,967,295 key-value pairs | Stores mappings of "field-value"s, an example like "user:jblin username JB password 123456 age 37" | |
| Bit arrays (or simply bitmaps) | | Based on the String base type, but having their own semantics | 
| [HyperLogLogs](https://en.wikipedia.org/wiki/HyperLogLog) |  | Based on the String base type, but having their own semantics  |



## Strings

### Set and Get

```
$ redis-cli set <myKey> <myValue>
$ redis-cli get <myKey>
```

ex.
```
$ redis-cli set my-key my-value
OK
$ redis-cli get my-key
my-value
```


### Only set when the key is not exist

```
$ redis-cli setnx <myKey> <myValue> 
```

### Return the old value and then set new value

```
$ redis-cli getset <myKey> <myValue>
```

ex.
```
$ redis-cli set my-key "Hello!"
OK
$ redis-cli getset my-key "HiHi!"
"Hello!"
$ redis-cli get my-key
"HiHi!"
```

### MSET and MGET

To set and get multiple key-value pairs, use `MSET` and `MGET` instead of `SET` and `GET`.

```
$ redis-cli mset <key1> <value1> <key2> <value2> [<key3> <value3> ...]
```

```
$ redis-cli mget <key1> <key2> [<key3>...]
```


### Number handling

```
$ redis-cli set counter 100
OK
$ redis-cli incr counter
(integer) 101
$ redis-cli incrby counter 50
(integer) 151
$ redis-cli decr counter
(integer) 150
$ redis-cli decrby counter 50
(integer) 100
```


## Lists

> Redis lists are implemented via Linked Lists. This means that even if you have millions of elements inside a list, the operation of adding a new element in the head or in the tail of the list is performed in constant time. 

### PUSH elements

```
$ redis-cli rpush my-list A B C
(integer) 3
$ redis-cli lpush my-list 1 2 3
(integer) 3
$ redis-cli lrange my-list 0 -1
"3"
"2"
"1"
"A"
"B"
"C"
```

### POP element


To pop the last elemet,

```
$ redis-cli rpop my-list
"C"
$ redis-cli rpop my-list
"B"
$ redis-cli lrange my-list 0 -1
"3"
"2"
"1"
"A"
```


To pop the first elemet,

```
$ redis-cli lpop my-list
"3"
$ redis-cli lpop my-list
"2"
$ redis-cli lrange my-list 0 -1
"1"
"A"
```

## Sets

Redis Sets are unordered collections of strings. The `SADD` command adds new elements to a set.


### Add members

```
$ redis-cli sadd <key> <member1> [<member2>...]
```

ex.
```
$ redis-cli sadd my-set A B C
(integer) 3
$ redis-cli sadd my-set D
(integer) 1
```

### Get all members

```
$ redis-cli smembers my-set
"D"
"C"
"B"
"A"
```

### Check if a member is exist in a set

```
$ redis-cli sismember my-set A
(integer) 1
$ redis-cli sismember my-set X
(integer) 0
```

### Get random member(s) from a set

- Removes and returns random member(s) from a set

```
$ redis-cli SMEMBERS key1
"C"
"B"
"A"
$ redis-cli SPOP key1
"B"
$ redis-cli SPOP key1 2
"C"
"A"
$ redis-cli SMEMBERS key1
(empty list or set)
```

- Returns random member(s) from a set

```
$ redis-cli SRANDMEMBER key1
"C"
$ redis-cli SRANDMEMBER key1 2
"B"
"A"
```

### Get the intersection of 2 sets

```
$ redis-cli SADD key1 A B C
(integer) 3
$ redis-cli SADD key2 C D E
(integer) 3
$ redis-cli SINTER key1 key2
"C"
```


## Sorted Sets (zset)

Sorted sets are sorted by giving a score to each member.

Rules:
1. If A and B are two elements with a different score, then A > B if A.score is > B.score.
2. If A and B have exactly the same score, then A > B if the A string is lexicographically greater than the B string. A and B strings can't be equal since sorted sets only have unique elements.

### Add members

```
$ redis-cli ZADD <key> <score1> <member1> [<score2> <member2> ... ] 
```

ex.
```
$ redis-cli ZADD my-zset 10 "Star Wars"
(integer) 1
$ redis-cli ZADD my-zset 20 "God Father" 30 "Fight Club"
(integer) 2
$ redis-cli 
```


### Get members


- ASC

```
$ redis-cli ZRANGE <key> <start> <stop>
```

- DESC

```
$ redis-cli ZREVRANGE <key> <start> <stop>
```

ex.
```
$ redis-cli ZRANGE my-zset 0 -1
"Star Wars"
"God Father"
"Fight Club"

$ redis-cli ZREVRANGE my-zset 0 -1
"Fight Club"
"God Father"
"Star Wars"
```

#### Advanced : [ZRANGEBYSCORE](https://redis.io/commands/zrangebyscore)

- Get member with score = 10
    ```
    $ redis-cli ZRANGEBYSCORE my-zset 10 10
    "Star Wars"
    ```

- 10 <= score <= 30
    ```
    $ redis-cli ZRANGEBYSCORE my-zset 10 30
    "Star Wars"
    "God Father"
    "Fight Club"
    ```

- 10 < score < 30
    ```
    $ redis-cli ZRANGEBYSCORE my-zset (10 (30
    "God Father"
    ```

- 10 <= score < 30
    ```
    $ redis-cli ZRANGEBYSCORE my-zset 10 (30
    "Star Wars"
    "God Father"
    ```

- 10 < score <= 30
    ```
    $ redis-cli ZRANGEBYSCORE my-zset (10 30
    "God Father"
    "Fight Club"
    ```


### Get ranking

```
$ redis-cli ZRANK my-zset "Star Wars"
(integer) 0
$ redis-cli ZRANK my-zset "God Father"
(integer) 1
$ redis-cli ZRANK my-zset "Fight Club"
(integer) 2
```



## Hashs

Redis Hashs are field-value pairs.

### Set field-value to hash

```
$ redis-cli HMSET <key> <field1> <value1> [<field2> <value2> ...]
```

ex.
```
$ redis-cli HMSET my-hash Name "JB" Age "37" City "Taipei"
OK
```

### Get all fields and values

```
$ redis-cli HGETALL my-hash
1) "Name"
2) "JB"
3) "Age"
4) "37"
5) "City"
6) "Taipei"
```

### Get value(s) for field(s)

```
$ redis-cli HGET my-hash Name
"JB"
$ redis-cli HMGET my-hash Age City
1) "37"
2) "Taipei"
```


## Bit arrays (Bitmaps)

> Bitmaps are not an actual data type, but a set of bit-oriented operations defined on the String type. Since strings are binary safe blobs and their maximum length is 512 MB, they are suitable to set up to 232 different bits.

```
$ `SETBIT <key> <offset> <value>`
```

ex.

For a Hex value, `0x7F`（= 127）, its binary representation on 8-bit is

| Position | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
|:--------:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| bit | 0 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |

```
$ redis-cli SETBIT my-bits 0 0
(integer) 0 
$ redis-cli SETBIT my-bits 1 1
(integer) 0
$ redis-cli SETBIT my-bits 2 1 
(integer) 0
$ redis-cli SETBIT my-bits 3 1 
(integer) 0
$ redis-cli SETBIT my-bits 4 1 
(integer) 0
$ redis-cli SETBIT my-bits 5 1 
(integer) 0
$ redis-cli SETBIT my-bits 6 1 
(integer) 0
$ redis-cli SETBIT my-bits 7 1 
(integer) 0

$ redis-cli BITCOUNT my-bits
(integer) 7

$ redis-cli GET my-bits
"\x7f"
```


## HyperLogLogs

> A HyperLogLog is a probabilistic data structure used in order to count unique things (technically this is referred to estimating the cardinality of a set). Usually counting unique items requires using an amount of memory proportional to the number of items you want to count, because you need to remember the elements you have already seen in the past in order to avoid counting them multiple times. However there is a set of algorithms that trade memory for precision: you end with an estimated measure with a standard error, which in the case of the Redis implementation is less than 1%. 


```
$ redis-cli pfadd hll a b c d
(integer) 1
$ redis-cli pfcount hll
(integer) 4
```

## References

* [Redis document - Data types](https://redis.io/topics/data-types)
* [Redis document - Introduction to Redis data types](https://redis.io/topics/data-types-intro)