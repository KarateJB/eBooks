# Docker - How to cleanup unused resources

How to cleanup resources (containers, volumes, images, networks) ...
    

## Delete volumes
    
```s
$ docker volume rm $(docker volume ls -qf dangling=true)
```

or

```s
$ docker volume ls -qf dangling=true | xargs -r docker volume rm
```

or prune volumes.

```s
$ docker volume prune
```



## Delete networks

```s
$ docker network ls  
$ docker network prune
```

or delete all.

```s
$ docker network ls | grep "bridge"   
$ docker network rm $(docker network ls | grep "bridge" | awk '/ / { print $1 }')
```    

or prune networks.

```s
$ docker network prune
```


## Delete docker images
    
```s    
$ docker images
$ docker rmi $(docker images --filter "dangling=true" -q --no-trunc)
```

or 

```s
$ docker images | grep "none"
$ docker images | grep "none" | awk '{ print $3; }' | xargs docker rmi
```

or prune images.
E.q. Remove images created more than 10 days (240h) ago

```s
$ docker image prune -a --force --filter "until=240h"
```


## Delete docker containers

```s
$ docker ps
$ docker ps -a
$ docker rm $(docker ps -qa --no-trunc --filter "status=exited")
```

### Force delete all containers

```s
$ docker rm -f $(docker ps -aq)
```

### Delete stopped containers

```s
$ docker container prune
```
    