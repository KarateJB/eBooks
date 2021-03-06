# Dockerfile
---

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
| ENV | Environment variables | <ul><li>`ENV <key> <value>`</li><li>`ENV <key>=<value>`</li></ul> | `ENV MY_VERSION 1.2`<br />`RUN /bin/bash echo $MY_VERSION is released` |
| COPY | Copy from local's `<src>` to `<dest>` | `COPY <src> <dest>` | |
| ADD | Like COPY, BUT the source can be URL or TAR (which will be unpacked) | `ADD <src> <dest>` | |
| ENTRYPOINT | Container's entry point, should have only one ENTRYPOINT | <ul><li>`ENTRYPOINT <command> <param1> <param1>`: Run in shell(/bin/sh -c)</li><li>`ENTRYPOINT ["<execuable>", "<param1>", "<param2>"]`: exec the command</li></ul>  | |
| VOLUME | Create data volume, such as database file or static files | `VOLUME ["/data"]` | |
| USER | The user name or UID for running container | `USER <user name>` | `RUN groupadd -r redis && useradd -r -g redis redis`<br />`USER redis`<br />`RUN ...` |
| WORKDIR | The work directory for build | `WORKDIR /path/..` | `WORKDIR /x`<br />`WORKDIR /y`<br />`RUN pwd`<br /> pwd will be /x/y. |
| ARG | The arguments for the image, which can be set when exec `docker build --build-arg <arg_name>=<value>` | `ARG <name>[=default value]` | |
| ONBUILD | The commands executed when the image is used as a base image | `ONBUILD <other commands>` | `ONBUILD ADD ./app/src` |
| STOPSIGNAL | Signal for stopping the container | `STOPSIGNAL <message>` | |
| SHELL | Default shell, which is `SHELL ["/bin/sh","-c"]` in default | `SHELL ["execuable", "parameters"]` | `SHELL ["/bin/sh","-c"]` |



## USER

```
# Create user: redis
$ RUN groupadd -r redis && useradd -r -g redis redis
# Download gosu
$ RUN wget -O /usr/local/bin/gosu "https://github.com/tianon/gosu/releases/download/1.7/gosu-amd64" \
    && chmod +x /usr/local/bin/gosu \
    && gosu nobody true
# CMD execute as other user
CMD [ "exec", "gosu", "redis", "redis-server" ]
```


## .dockerignore

Create `.dockerignore` to ignore files or folders.

```
*/tmp
*/*/tmp*
```

## Build image

```s
$ docker build [--no-cache] -t <repository>/<image name> [-f] <docker file's directory>
```

|        Parameter        | in short | Value | Description |
|:------------------------|:--------:|:-----:|:------------|
| --tag | -t | | Name and optionally a tag in the `name:tag` format |
| --file | -f | | Absolute dockerfile's directory path (Default is `./Dockerfile`) |
| --no-cache |  | | Disable cache on the build |

> See more on [docs.docker.com](https://docs.docker.com/engine/reference/commandline/build/)


E.q. Use the Dockerfile in current directory to build the image,

```s
$ docker build -t karatejb/ansible:latest .
```

## Reverse image to get Dockerfile

- Pull dockerfile-from-image

  ```
  $ docker pull centurylink/dockerfile-from-image
  ```

- Reverse an image
  
  ```
  $ docker run -v /var/run/docker.sock:/var/run/docker.sock centurylink/dockerfile-from-image <Image tag/id> Dockerfile.txt
  ```

  For example,

  ```s
  $ docker run -v /var/run/docker.sock:/var/run/docker.sock centurylink/dockerfile-from-image mysql Dockerfile.
  txt
  ```



## Use certain user to execute script on EntryPoint/CMD


For example,

```dockerfile
FROM postgres:11

ENV POSTGRES_USER postgres
ENV POSTGRES_PASSWORD xxxxx

# Add user: postgres
RUN sudo adduser postgres sudo

EXPOSE 5432
ENTRYPOINT ["/bin/sh", "-c", "sudo -E -u postgres sh -c 'echo ~/ $POSTGRES $POSTGRES_PASSWORD'"]

# Or use this
# ENTRYPOINT ["/bin/sh", "-c", "su --preserve-environment - postgres -c 'echo ~/ $POSTGRES $POSTGRES_PASSWORD'"]
```

Notice that we have to preserve the existing environment variables by adding the argument `-U` when sudo.
> From [sudo manual](https://www.sudo.ws/man/1.8.13/sudo.man.html#E)<br />
> `-E, --preserve-env`: Indicates to the security policy that the user wishes to preserve their existing environment variables. The security policy may return an error if the user does not have permission to preserve the environment.


The output will be

```s
/root/ postgres xxxxx
```

but if we execute without preserving environment variables, we cannot get the `$POSTGRES_USER` and `$POSTGRES_PASSWORD` and the output will be

```s
/var/lib/postgresql/   
```

So be careful to use `~/` on this scenario, cus the user `postgres` won't have the permission on `/root/`.





## Other samples

### [ASP.NET Core] Build and run kestrel

[Sample Dockerfile](https://github.com/KarateJB/JB-eBooks/blob/master/DevOps/Docker/06.Dockerfile/samples/aspnetcore_build_and_run/dockerfile)

