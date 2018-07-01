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

> Result: 80/tcp -> 0.0.0.0:32768


### Map host:5000 to container:80

```
$ docker run -d -p 5000:80 --name my-nginx nginx
$ docker container port my-nginx
```

> Result: 80/tcp -> 0.0.0.0:5000


### Map ports range to container

```
$ docker run -d -p 8000-8002:8000-8002 --name my-nginx nginx
$ docker container port my-nginx
```

> Result: <br />
> 8000/tcp -> 0.0.0.0:8000 <br />
> 8001/tcp -> 0.0.0.0:8001 <br />
> 8002/tcp -> 0.0.0.0:8002 <br />

