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
> SET <myKey> <myValue>
> GET <myKey>
```

ex.
```
> SET my-key my-value
OK
> GET my-key
my-value
```


### Only set when the key is not exist

```
> SETNX <myKey> <myValue> 
```

### Return the old value and then set new value

```
> GETSET <myKey> <myValue>
```

ex.
```
> SET my-key "Hello!"
OK
> GETSET my-key "HiHi!"
"Hello!"
>  GET my-key
"HiHi!"
```

### MSET and MGET

To set and get multiple key-value pairs, use `MSET` and `MGET` instead of `SET` and `GET`.

```
> MSET <key1> <value1> <key2> <value2> [<key3> <value3> ...]
```

```
> MGET <key1> <key2> [<key3>...]
```


### Number handling

```
> SET counter 100
OK
> INCR counter
(integer) 101
> INCRBY counter 50
(integer) 151
> DECR counter
(integer) 150
> DECRBY counter 50
(integer) 100
```


## Lists

> Redis lists are implemented via Linked Lists. This means that even if you have millions of elements inside a list, the operation of adding a new element in the head or in the tail of the list is performed in constant time. 

### PUSH elements

```
> RPUSH my-list A B C
(integer) 3
> LPUSH my-list 1 2 3
(integer) 3
> LRANGE my-list 0 -1
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
> RPOP my-list
"C"
> RPOP my-list
"B"
> LRANGE my-list 0 -1
"3"
"2"
"1"
"A"
```


To pop the first elemet,

```
> LPOP my-list
"3"
> LPOP my-list
"2"
> LRANGE my-list 0 -1
"1"
"A"
```

## Sets

Redis Sets are unordered collections of strings. The `SADD` command adds new elements to a set.


### Add members

```
> SADD <key> <member1> [<member2>...]
```

ex.
```
> SADD my-set A B C
(integer) 3
> SADD my-set D
(integer) 1
```

### Get all members

```
> SMEMBERS my-set
"D"
"C"
"B"
"A"
```

### Check if a member is exist in a set

```
> SISMEMBER my-set A
(integer) 1
> SISMEMBER my-set X
(integer) 0
```

### Get random member(s) from a set

- Removes and returns random member(s) from a set

```
> SMEMBERS key1
"C"
"B"
"A"
> SPOP key1
"B"
> SPOP key1 2
"C"
"A"
> SMEMBERS key1
(empty list or set)
```

- Returns random member(s) from a set

```
> SRANDMEMBER key1
"C"
> SRANDMEMBER key1 2
"B"
"A"
```

### Get the intersection of 2 sets

```
> SADD key1 A B C
(integer) 3
> SADD key2 C D E
(integer) 3
> SINTER key1 key2
"C"
```


## Sorted Sets (zset)

Sorted sets are sorted by giving a score to each member.

Rules:
1. If A and B are two elements with a different score, then A > B if A.score is > B.score.
2. If A and B have exactly the same score, then A > B if the A string is lexicographically greater than the B string. A and B strings can't be equal since sorted sets only have unique elements.

### Add members

```
> ZADD <key> <score1> <member1> [<score2> <member2> ... ] 
```

ex.
```
> ZADD my-zset 10 "Star Wars"
(integer) 1
> ZADD my-zset 20 "God Father" 30 "Fight Club"
(integer) 2 
```


### Get members


- ASC

```
> ZRANGE <key> <start> <stop>
```

- DESC

```
> ZREVRANGE <key> <start> <stop>
```

ex.
```
> ZRANGE my-zset 0 -1
"Star Wars"
"God Father"
"Fight Club"

> ZREVRANGE my-zset 0 -1
"Fight Club"
"God Father"
"Star Wars"
```

#### Advanced : [ZRANGEBYSCORE](https://redis.io/commands/zrangebyscore)

- Get member with score = 10
    ```
    > ZRANGEBYSCORE my-zset 10 10
    "Star Wars"
    ```

- 10 <= score <= 30
    ```
    > ZRANGEBYSCORE my-zset 10 30
    "Star Wars"
    "God Father"
    "Fight Club"
    ```

- 10 < score < 30
    ```
    > ZRANGEBYSCORE my-zset (10 (30
    "God Father"
    ```

- 10 <= score < 30
    ```
    > ZRANGEBYSCORE my-zset 10 (30
    "Star Wars"
    "God Father"
    ```

- 10 < score <= 30
    ```
    > ZRANGEBYSCORE my-zset (10 30
    "God Father"
    "Fight Club"
    ```


### Get ranking

```
> ZRANK my-zset "Star Wars"
(integer) 0
> ZRANK my-zset "God Father"
(integer) 1
> ZRANK my-zset "Fight Club"
(integer) 2
```



## Hashs

Redis Hashs are field-value pairs.

### Set field-value to hash

```
> HMSET <key> <field1> <value1> [<field2> <value2> ...]
```

ex.
```
> HMSET my-hash Name "JB" Age "37" City "Taipei"
OK
```

### Get all fields and values

```
> HGETALL my-hash
1) "Name"
2) "JB"
3) "Age"
4) "37"
5) "City"
6) "Taipei"
```

### Get value(s) for field(s)

```
> HGET my-hash Name
"JB"
> HMGET my-hash Age City
1) "37"
2) "Taipei"
```


## Bit arrays (Bitmaps)

> Bitmaps are not an actual data type, but a set of bit-oriented operations defined on the String type. Since strings are binary safe blobs and their maximum length is 512 MB, they are suitable to set up to 232 different bits.

```
> SETBIT <key> <offset> <value>
```

ex.

For a Hex value, `0x7F`（= 127）, its binary representation on 8-bit is

| Position | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
|:--------:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| bit | 0 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |

```
> SETBIT my-bits 0 0
(integer) 0 
> SETBIT my-bits 1 1
(integer) 0
> SETBIT my-bits 2 1 
(integer) 0
> SETBIT my-bits 3 1 
(integer) 0
> SETBIT my-bits 4 1 
(integer) 0
> SETBIT my-bits 5 1 
(integer) 0
> SETBIT my-bits 6 1 
(integer) 0
> SETBIT my-bits 7 1 
(integer) 0

> BITCOUNT my-bits
(integer) 7

> GET my-bits
"\x7f"
```


## HyperLogLogs

> A HyperLogLog is a probabilistic data structure used in order to count unique things (technically this is referred to estimating the cardinality of a set). Usually counting unique items requires using an amount of memory proportional to the number of items you want to count, because you need to remember the elements you have already seen in the past in order to avoid counting them multiple times. However there is a set of algorithms that trade memory for precision: you end with an estimated measure with a standard error, which in the case of the Redis implementation is less than 1%. 


```
> PFADD hll a b c d
(integer) 1
> PFCOUNT hll
(integer) 4
```

## References

* [Redis document - Data types](https://redis.io/topics/data-types)
* [Redis document - Introduction to Redis data types](https://redis.io/topics/data-types-intro)