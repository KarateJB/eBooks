# Docker Image
---

## Pull image

```
docker pull [hub's registry/]{image name}[:tag]
```

|        Parameter        | in short | Value | Description |
|:------------------------|:--------:|:-----:|:------------|
| --all-tags | -a | true,false(default) | Pull the image for all tags |


1. The defaul tag will be `latest`
2. The default registry will be `registry.hub.docker.com/`
   If you would like to pull from other registry, use it like this, 
   `docker pull gcr.io/tensorflow/tensorflow`


## List images

```
$ docker images
```

|        Parameter        | in short | Value | Description |
|:------------------------|:--------:|:-----:|:------------|
| --all | -a | true,false(default) | List all images, including of temp files |
| --digests |  | true,false(default) | Also show SHA256 hash code |
| --filter | -f | true,false(default) | Filter output based on conditions provided |
| --no-trunc |  | true(default),false | Don’t truncate output |
| --quiet | -q | true,false(default) | Just output ID |


## Inspect image to see more details

```
$ docker inspect {image name}[:tag]
```

If you want to only see the spefic information, give the hierarchy by `-f`.

ex.
```
$ docker inspect -f {{".Architecture"}} ubuntu:14.04
$ docker inspect -f {{".ContainerConfig.Hostname"}} ubuntu:14.04
```


## Tag the local images

```
$ docker tag {image name}:{tag} {TAG's image name}:{TAG's tag}
```

> Notice the TAG will point to the same image.


## Search images

```
$ docker search [name]
```

|        Parameter        | in short | Value | Description |
|:------------------------|:--------:|:-----:|:------------|
| --no-trunc |  | true,false(default) | Don’t truncate output |
| --limit | | Default 25 | Max number of search results |
| --filter | -f |  | Filter output based on conditions provided |
| --format |  |  | Pretty-print search using a Go template |


- Search images with stars>=5 and are official

```
$ docker search <image name> --filter stars=5 --filter is-official=true
```

- Search images which are automated builds

```
$ docker search <image name> --filter is-automated
```




## Delete local image

```
$ docker rmi {image name}[:tag] [-f]
```

> Do not use `-f` to force delete the image.
>
> Instead, show the containers by `docker ps -a`
>
> And delete the container of the image first by `docker rm <container id>`




## Create image

```
$ docker commit -m "xxxxx" -a "JB Lin" {container's id} {image name}[:tag]
```

|        Parameter        | in short | Value | Description |
|:------------------------|:--------:|:-----:|:------------|
| --author | -a | | Author's name |
| --message | -m | | Commit message |
| --pause | -p | | Pause the container when committing the image |



ex. 

```
$ docker run -it ubuntu:14.04 /bin/bash
$ root@0ffa461707cb:/# touch test
$ root@0ffa461707cb:/# exit
$ docker commit -m "Add a new file" -a "JB" 0ffa461707cb my-test:0.0.1
```


## Save image

```
$ docker save -o <file_name>.tar <image name>[:tag]
```

ex. `$ docker save -o my-test_0.0.1.tar my-test:0.0.1`


## Load image

```
$ docker load --input <filename>.tar
```

ex. `docker load --input my-test_0.0.1.tar`


## Upload image to hub

```
$ docker push <image name>[:Tag]
```

> Must tag the image as the format: `<docker_user>/<image>[:<tag>]`

ex.
```
$ docker tag my-ubuntu:0.01 karatejb/my-ubuntu:0.01
$ docker push karatejb/my-ubuntu:0.01
```


