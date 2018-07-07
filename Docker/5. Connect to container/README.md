# Connect to container

## Port mapping

|        Parameter        | in short | Value | Description |
|:------------------------|:--------:|:-----:|:------------|
| -P |  | No need | Random port mapping |
| -p |  | Host port:Container port <br /> ex. 8000:8000 or 8000-9000-8000-9000 | Map tcp port(s) to container's port(s) |


### Random port mapping

```
$ docker run -d -P --name my-nginx nginx
$ docker container port my-nginx 
```

> `docker container port` equals to `docker port`

> Result: 80/tcp -> 0.0.0.0:32768




### Map host:5000 to container:80

```
$ docker run -d -p 5000:80 --name my-nginx nginx
$ docker container port my-nginx
```

> Result: 80/tcp -> 0.0.0.0:5000


### Map multiple ports to container

```
$ docker run -d -p 1234:5000 -p 5678:6000 --name my-nginx nginx
$ docker container port my-nginx
```

> Result: <br />
> 5000/tcp -> 0.0.0.0:1234 <br />
> 6000/tcp -> 0.0.0.0:5678



### Map ports range to container

```
$ docker run -d -p 8000-8002:8000-8002 --name my-nginx nginx
$ docker container port my-nginx
```

> Result: <br />
> 8000/tcp -> 0.0.0.0:8000 <br />
> 8001/tcp -> 0.0.0.0:8001 <br />
> 8002/tcp -> 0.0.0.0:8002 <br />



### Map specified Host IP and Port to container

Map Host 127.0.0.1:3000 to Container's port 5000

```
$ docker run -d -p 127.0.0.1:3000:5000 --name my-nginx nginx
```


For random host port, use `::` :

```
$ docker run -d -p 127.0.0.1::80 --name my-nginx nginx
```

> Result: 80/tcp -> 127.0.0.1:32768


### Map UDP Port

```
$ docker run -d -p 127.0.0.1:5000:80/udp --name my-nginx nginx
```


## Linking

> Warning: The --link flag is a legacy feature of Docker. It may eventually be removed in the future. <br />
> See reference [here](https://docs.docker.com/network/links/).

1. Create a DB container

    ```
    $ docker run -d -p 3306:3306 --name mysql-db mysql
    ```


2. Create Web container

    ```
    $ docker start mysql-db
    $ docker run --name my-web --link mysql-db:my-db ubuntu:14.04
    ```

    > * `--link my-sql-db:my-db` = link container'name: my-sql-db, as alias name: my-db  
    > * Make sure linking to a RUNNINNG container!
    > * `--link` will update web server's environment variable and `/etc/hosts` as following,

3. Ping DB in Web

    Check /etc/hosts
    
    ```
    $ docker exec -it my-web /bin/bash
    $ root@xxxx:/# cat /etc/hosts
    ```
     
    ![](assets/001.png) 


    ```
    $ root@xxxx:/# apt-get update 
    $ root@xxxx:/# apt-get install -y iputils-ping 
    $ root@xxxx:/# ping my-db
    ```
