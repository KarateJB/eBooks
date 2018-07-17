# Dockerfile

Dockerfile is a text file which can be used to create custom image.

The major parts in a Dockerfile are:

- Base on which image
- Author
- Command inside the image
- Command for starting the container


## Commands

|        Command        | Description | Format | Example |
|:----------------------|:------------|:-------|:--------|
| `FROM` | From which base image, the base image will be pulled from Docker Hub if not exist locally | `FROM <image>[:<tag>]` | `FROM ubuntu:14.04` |
| `MAINTAINER` (deprecated)<br /> Use `LABEL maintainer` | Maintainer's information | `LABEL maintainer[=]xx@docker.com  | `LABEL maintainer xx@docker.com` <br /> `LABEL maintainer=xx@docker.com` |
| RUN | Run the commands | <ul><li>`RUN <command>`: Run in shell(/bin/sh -c)</li><li>`RUN ["<execuable>", "<param1>", "<param2>"]`: exec the command</li></ul> | `RUN apt-get update`<br />`RUN ["/bin/bash", "-c", "echo helloworld"]` |
| CMD | The command will be executed when starting the container | <ul><li>`CMD <command>`: Run in shell(/bin/sh -c)</li><li>`CMD ["<execuable>", "<param1>", "<param2>"]`: exec the command</li><li>`CMD ["<param1>","<param2>"]`: Provide default parameters for ENTRYPOINT</li></ul> |  |
| LABEL | Metadata | <ul><li>`LABEL <key> <value>`</li><li>`LABEL <key>=<value>`</li></ul> | `LABEL version="1.0.0"`<br />`LABEL description "Awesome container"` |
| EXPOSE | Declare the listening port (but not mapping) | `EXPOSE <port1> [<port2> <port3>]` | `EXPOSE 80 433` |
| ENV | Environment variables | <ul><li>`LABEL <key> <value>`</li><li>`LABEL <key>=<value></li></ul>` | `ENV MY_VERSION 1.2`<br />`RUN /bin/bash echo $MY_VERSION is released` |
| COPY | Copy from local's `<src>` to `<dest>` | `COPY <src> <dest>` | |
| ADD | Like COPY, BUT the source can be URL or TAR (which will be unpacked) | `ADD <src> <dest>` | |
| ENTRYPOINT | Container's entry point, should have only one ENTRYPOINT | <ul><li>`ENTRYPOINT <command> <param1> <param1>`: Run in shell(/bin/sh -c)</li><li>`ENTRYPOINT ["<execuable>", "<param1>", "<param2>"]`: exec the command</li></ul>  | |
| VOLUME | Create data volume, such as database file or static files | `VOLUME ["/data"]` | |
| USER | The user name or UID for running container | `USER <user name>` | `RUN groupadd -r redis && useradd -r -g redis redis`<br />`USER redis`<br />`RUN ...` |
| WORKDIR | The work directory for build | `WORKDIR /path/..` | `WORKDIR /x`<br />`WORKDIR /y`<br />`RUN pwd`<br /> pwd will be /x/y. |
| ARG | The arguments for the image, which can be set when exec `docker build -arg <arg_name>=<value>` | `ARG <name>[=default value]` | |
| ONBUILD | The commands executed when the image is used as a base image | `ONBUILD <other commands>` | `ONBUILD ADD ./app/src` |
| STOPSIGNAL | Signal for stopping the container | `STOPSIGNAL <message>` | |
| SHELL | Default shell, which is `SHELL ["/bin/sh","-c"]` in default | `SHELL ["execuable", "parameters"]` | `SHELL ["/bin/sh","-c"]` |



> ## USER
>
>```
># Create user: redis
>$ RUN groupadd -r redis && useradd -r -g redis redis
># Download gosu
>$ RUN wget -O /usr/local/bin/gosu "https://github.com/tianon/gosu/releases/download/1.7/gosu-amd64" \
>    && chmod +x /usr/local/bin/gosu \
>    && gosu nobody true
># CMD execute as other user
>CMD [ "exec", "gosu", "redis", "redis-server" ]
>```


## .dockerignore

Create `.dockerignore` to ignore files or folders.

```
*/tmp
*/*/tmp*
```

## Build image

```
$ docker build -t <repository>/<image name> [-f] <docker file's directory>
```

|        Parameter        | in short | Value | Description |
|:------------------------|:--------:|:-----:|:------------|
| -f |  | | Absolute dockerfile's directory path |


## Reverse image to get Dockerfile

- Pull dockerfile-from-image

  ```
  $ docker pull centurylink/dockerfile-from-image
  ```

- Reverse an image
  
  ```
  $ docker run -v /var/run/docker.sock:/var/run/docker.sock centurylink/dockerfile-from-image <Image tag/id> Dockerfile.txt
  ```


  docker run -v /var/run/docker.sock:/var/run/docker.sock centurylink/dockerfile-from-image mysql Dockerfile.txt

