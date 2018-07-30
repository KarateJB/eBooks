# Container

## Create container

```
$ docker create -it <image name>:<tag>
```

ex. 
```
$ docker create -it ubuntu:14.04
```

## List containers


To show only running containers:
```
$ docker ps
```

To show all containers:
```
$ docker ps -a
```

To show the latest created container (includes all states):
```
docker ps -l
```

To show n last created containers (includes all states):
```
docker ps -n=2
```

> In Docker's new version, we can use `docker container ls` to replace `docker ps`


## Start a container

```
$ docker start <container id/name>
```

ex.
`$ docker start ae12303240a0` or `$ docker start loving_lumiere`



## Stop a container

```
$ docker stop <container id/name>
```


## Delete a container

```
$ docker rm <container id/name>
```


## docker run

`docker Run` = `docker create` + `docker start`

```
$ docker run [-d] <image name>[:tag] 
```

|        Parameter        | in short | Value | Description |
|:------------------------|:--------:|:-----:|:------------|
| -d |  | | Detached mode: Run container in the background (See [Detached vs foreground](https://docs.docker.com/engine/reference/run/#detached-vs-foreground)) |
| --interactive | -i | | Keep STDIN open even if not attache |
| --tty | -t | | Allocate a pseudo-tty |
| --rm |  | | Automatically clean up the container and remove the file system when the container exits, (See [Clean up (--rm)](https://docs.docker.com/engine/reference/run/#clean-up---rm)) |
| --link |  | `--link <container'sname/id>:<alias>` | Add link to another container. The `--link` flag is a legacy feature of Docker, see [Docker document](https://docs.docker.com/network/links/) and samples in [5. Connect to container](https://github.com/KarateJB/eBooks/tree/master/Docker/5.%20Connect%20to%20container) |



> The `-it` instructs Docker to allocate a pseudo-TTY connected to the container’s stdin; creating an interactive bash shell in the container.


ex.
```
$ docker run ubuntu:14.04 /bin/echo "Hello, world"
```


## Enter the container

```
$ docker attach <container id/name>
```

or 

```
$ docker exec <container id/name>
```

ex.
```
$ docker exec -it ae12303240a0 /bin/bash
```


## Inspect container to see more details


- See name

    ```
    $ docker inspect -f {{".Name"}} <container id>
    ```

