# Dockerfile

Dockerfile is a text file which can be used to create custom image.

The major parts in a Dockerfile are:

- Base on which image
- Author
- Command inside the image
- Command for starting the container


## Commands

|        Command        | Description | Format | Example |
|:----------------------|:-----------:|:-------|:--------|
| `FROM` | From which base image, the base image will be pulled from Docker Hub if not exist locally | `FROM <image>[:<tag>]` | `FROM ubuntu:14.04` |
| `MAINTAINER` (deprecated)<br /> Use `LABEL maintainer` | Maintainer's information | `LABEL maintainer[=]xx@docker.com  | `LABEL maintainer xx@docker.com`<br />`LABEL maintainer=xx@docker.com` |
| RUN | Run the commands | <ul><li>`RUN <command>`: Run in shell(/bin/sh -c)</li><li>`RUN ["<execuable>", "param1", "param2"]`: exec the command</li></ul> | `RUN apt-get update`<br />`RUN ["/bin/bash", "-c", "echo helloworld"]` |
| | | | |
| | | | |
| | | | |
| | | | |
| | | | |
| | | | |
| | | | |
| | | | |
| | | | |
| | | | |
