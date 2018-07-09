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
| ENTRYPOINT | Container's entry point |  | |
| VOLUME | Create data volume | | |
| USER | The user name or UID for running container | | |
| WORKDIR | The work directory for build | | |
| ARG | The arguments for the image | | |
| ONBUILD | The commands executed when the image is used as a base image | | |
| STOPSIGNAL | Signal for stopping the container | | |
| HEALTHCHECK | State check | | |
| SHELL | Default shell | | |


