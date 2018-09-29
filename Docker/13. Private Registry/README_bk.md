# Private Docker Registry

> The Registry is a stateless, highly scalable server side application that stores and lets you distribute Docker images. (See reference: [Docker Registry](https://docs.docker.com/registry/))

There 2 ways to install Docker Registry:
1. Docker image
2. Distribution source code from Github


## Install Docker Registry

### Docker image

The docker image can be found on [Docker Hub](https://hub.docker.com/_/registry/)

```
$ docker run -d -p 5000:5000 --restart=always --name <container name> registry[:<tag>]
```

For example, to put the private images in local directory:

```
docker run -d -p 5000:5000 \
              --restart=always
              --name my-registry
              -v /opt/data/registry:/var/lib/registry \
              registry
```

### Distribution source code

Install docker-ce on ubuntu,

```
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
# add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
# apt-get update
# apt-get install docker-ce
```


Install the below packages to allow apt to use a repository over HTTPS:

```
$ apt-get install \
          apt-transport-https \
          ca-certificates \
          curl \
          software-properties-common
```




Create directory: `/go/src/github/docker/` and get the distribution source code from Github.

```
$ export GOPATH=/go
$ mkdir -p $GOPATH/src/github/docker/
$ cd $GOPATH/src/github.com/docker/
$ git clone https://github.com/docker/distribution.git
$ cd distribution
```

Copy the template config to `/etc/docker/registry/config.yml`

```
$ cp cmd/registry/config-dev.yml /etc/docker/registry/config.yml
$ mkdir -p /var/lib/registry
```

Test it,

```
$ curl -i 127.0.0.1:5000/v2/

```

## Reference

- [docker.github.io](https://github.com/docker/docker.github.io/blob/master/registry/deploying.md)
- [Running your own Docker Registry](https://www.admintome.com/blog/running-your-own-docker-registry/)